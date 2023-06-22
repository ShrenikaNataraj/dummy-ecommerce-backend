import db from "../models";
import { CategoryOutput } from "../models/Category";

export const getAllCategory = async (): Promise<CategoryOutput[]> => {
    let allCategories:CategoryOutput[] = await db.Category.findAll({ raw: true });
    return allCategories;
};