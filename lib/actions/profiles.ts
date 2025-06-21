"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function checkUsernameAvailability(username: string) {
  try {
    const check = await prisma.profile.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });
    if (check) {
      return {
        success: false,
        error: "Username is already taken. Please choose another one.",
      };
    }
    return {
      success: true,
      message: "Username is available.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while checking username availability.",
    };
  }
}

export async function addProfile(profileData: {
  username: string;
  bio: string;
  avatar: string;
  displayName: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const newProfile = await prisma.profile.create({
      data: {
        name: profileData.displayName,
        username: profileData.username.toLowerCase(),
        bio: profileData.bio,
        avatar: profileData.avatar,
        userId: session?.user.id as string,
      },
    });
    return {
      success: true,
      profile: newProfile,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while creating the profile.",
    };
  }
}

export async function getProfiles(userId: string) {
  const profiles = await prisma.profile.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return profiles;
}

export async function deleteProfile(username: string, pathname: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return {
        success: false,
        error: "You must be logged in to delete a profile.",
      };
    }

    const profile = await prisma.profile.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!profile || profile.userId !== session.user.id) {
      return {
        success: false,
        error: "Profile not found or you do not have permission to delete it.",
      };
    }

    await prisma.profile.delete({
      where: {
        id: profile.id,
      },
    });

    revalidatePath(pathname);
    return {
      success: true,
      message: "Profile deleted successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while deleting the profile.",
    };
  }
}

export async function checkProfileExists(username: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });
    return !!profile;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getProfileByUsername(username: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        links: {
          select: {
            id: true,
            title: true,
            url: true,
            emoji: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProfile(
  username: string,
  profileData: {
    avatar: string;
    displayName: string;
    bio: string;
  }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return {
        success: false,
        error: "You must be logged in to update your profile.",
      };
    }

    const profile = await prisma.profile.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!profile || profile.userId !== session.user.id) {
      return {
        success: false,
        error: "Profile not found or you do not have permission to update it.",
      };
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        name: profileData.displayName,
        bio: profileData.bio,
        avatar: profileData.avatar,
      },
    });

    revalidatePath(`/update-profile/${username}`);
    return {
      success: true,
      profile: updatedProfile,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while updating the profile.",
    };
  }
}

export async function incrementProfileViews(username: string) {
  await prisma.profile.update({
    where: { username },
    data: { views: { increment: 1 } },
  });
}

export async function getTotalProfileViews(userId: string) {
  const result = await prisma.profile.aggregate({
    where: { userId },
    _sum: { views: true },
  });

  return {
    totalViews: result._sum.views || 0,
  };
}
