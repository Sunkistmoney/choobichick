"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Sex, ChickenStatus, InventoryCategory, ExpenseCategory } from "@prisma/client";

export async function addChicken(formData: FormData) {
  const tagId = formData.get("tagId") as string;
  const breed = formData.get("breed") as string;
  const sex = formData.get("sex") as Sex;
  const birthDate = new Date(formData.get("birthDate") as string);
  const weightRaw = formData.get("weight") as string;
  const weight = weightRaw ? parseFloat(weightRaw) : null;

  await prisma.chicken.create({
    data: {
      tagId,
      breed,
      sex,
      birthDate,
      weight: weight ?? undefined,
      status: ChickenStatus.active,
    },
  });

  redirect("/chickens");
}

export async function addFeedingSchedule(chickenId: string, formData: FormData) {
  const feedType = formData.get("feedType") as string;
  const quantity = parseFloat(formData.get("quantity") as string);
  const unit = formData.get("unit") as string;
  const feedingTime = formData.get("feedingTime") as string;
  const notes = (formData.get("notes") as string) || null;

  await prisma.feedingSchedule.create({
    data: {
      chickenId,
      feedType,
      quantity,
      unit,
      feedingTime,
      notes: notes ?? undefined,
    },
  });

  redirect(`/chickens/${chickenId}`);
}

export async function addInventoryItem(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as InventoryCategory;
  const quantity = parseFloat(formData.get("quantity") as string);
  const unit = formData.get("unit") as string;
  const lowStockThreshold = parseFloat(formData.get("lowStockThreshold") as string);
  const expiryDateRaw = formData.get("expiryDate") as string;
  const notes = (formData.get("notes") as string) || null;

  await prisma.inventoryItem.create({
    data: {
      name,
      category,
      quantity,
      unit,
      lowStockThreshold,
      expiryDate: expiryDateRaw ? new Date(expiryDateRaw) : undefined,
      notes: notes ?? undefined,
    },
  });

  redirect("/inventory");
}

export async function addEggSale(formData: FormData) {
  const date = new Date(formData.get("date") as string);
  const boxesSold = parseInt(formData.get("boxesSold") as string, 10);
  const piecesPerBox = parseInt(formData.get("piecesPerBox") as string, 10) || 100;
  const pricePerBox = parseFloat(formData.get("pricePerBox") as string);
  const totalRevenue = boxesSold * pricePerBox;
  const buyer = (formData.get("buyer") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  await prisma.eggSale.create({
    data: {
      date,
      boxesSold,
      piecesPerBox,
      pricePerBox,
      totalRevenue,
      buyer: buyer ?? undefined,
      notes: notes ?? undefined,
    },
  });

  redirect("/sales");
}

export async function addExpense(formData: FormData) {
  const date = new Date(formData.get("date") as string);
  const category = formData.get("category") as ExpenseCategory;
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const notes = (formData.get("notes") as string) || null;

  await prisma.expense.create({
    data: {
      date,
      category,
      description,
      amount,
      notes: notes ?? undefined,
    },
  });

  redirect("/expenses");
}

export async function updateInventoryItem(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as InventoryCategory;
  const quantity = parseFloat(formData.get("quantity") as string);
  const unit = formData.get("unit") as string;
  const lowStockThreshold = parseFloat(formData.get("lowStockThreshold") as string);
  const expiryDateRaw = formData.get("expiryDate") as string;
  const notes = (formData.get("notes") as string) || null;

  await prisma.inventoryItem.update({
    where: { id },
    data: {
      name,
      category,
      quantity,
      unit,
      lowStockThreshold,
      expiryDate: expiryDateRaw ? new Date(expiryDateRaw) : null,
      notes: notes ?? null,
    },
  });

  redirect("/inventory");
}

export async function addEggProductionRecord(formData: FormData) {
  const date = new Date(formData.get("date") as string);
  const totalEggs = parseInt(formData.get("totalEggs") as string, 10);
  const brokenEggs = parseInt(formData.get("brokenEggs") as string, 10) || 0;
  const unsellableEggs = parseInt(formData.get("unsellableEggs") as string, 10) || 0;
  const sellableEggs = totalEggs - brokenEggs - unsellableEggs;
  const notes = (formData.get("notes") as string) || null;

  await prisma.eggProduction.create({
    data: {
      date,
      totalEggs,
      brokenEggs,
      unsellableEggs,
      sellableEggs,
      notes: notes ?? undefined,
    },
  });

  redirect("/egg-production");
}
