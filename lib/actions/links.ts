"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function getLinks(username: string) {
  const links = await prisma.link.findMany({
    where: {
      profile: {
        username: username,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return links;
}

export async function addLink(
  username: string,
  data: { title: string; url: string; emoji: string },
  pathname: string
) {
  const profile = await prisma.profile.findUnique({
    where: {
      username: username,
    },
  });

  if (!profile) {
    return {
      success: false,
      error: "Profile not found",
    };
  }

  const newLink = await prisma.link.create({
    data: {
      title: data.title,
      url: data.url,
      emoji: data.emoji || null,
      profileId: profile.id,
    },
  });
  revalidatePath(pathname);
  return {
    success: true,
    link: newLink,
  };
}

export async function updateLink(
  linkId: string,
  data: { title: string; url: string; emoji: string },
  pathname: string
) {
  const link = await prisma.link.findUnique({
    where: {
      id: linkId,
    },
  });

  if (!link) {
    return {
      success: false,
      error: "Link not found",
    };
  }

  const updatedLink = await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      title: data.title,
      url: data.url,
      emoji: data.emoji || null,
    },
  });

  revalidatePath(pathname);
  return {
    success: true,
    link: updatedLink,
  };
}

export async function deleteLink(
  profileId: string,
  linkId: string,
  pathname: string
) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!profile) {
    return {
      success: false,
      error: "Profile not found",
    };
  }

  await prisma.link.delete({
    where: {
      id: linkId,
      profileId: profile.id,
    },
  });

  revalidatePath(pathname);
  return {
    success: true,
  };
}

export async function orderLink(
  links: { id: string; order: number }[],
  pathname: string
) {
  try {
    const updatePromises = links.map((link) =>
      prisma.link.update({
        where: { id: link.id },
        data: { order: link.order },
      })
    );
    await Promise.all(updatePromises);

    revalidatePath(pathname);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to update link order.",
    };
  }
}

export async function getUserLinksStats(userId: string) {
  const profiles = await prisma.profile.findMany({
    where: { userId },
    select: { id: true },
  });
  const profileIds = profiles.map((p) => p.id);

  if (profileIds.length === 0) {
    return { totalLinks: 0, totalClicks: 0 };
  }

  const [totalLinks, totalClicks] = await prisma.$transaction([
    prisma.link.count({
      where: { profileId: { in: profileIds } },
    }),
    prisma.link.aggregate({
      where: { profileId: { in: profileIds } },
      _sum: { clicks: true },
    }),
  ]);

  return {
    totalLinks,
    totalClicks: totalClicks._sum.clicks || 0,
  };
}

export async function incrementLinkClicks(linkId: string) {
  await prisma.link.update({
    where: { id: linkId },
    data: { clicks: { increment: 1 } },
  });
}
