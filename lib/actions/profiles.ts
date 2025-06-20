"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";

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
