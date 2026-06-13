"use server";
import { serverMutation } from "../core/server";

const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
}
