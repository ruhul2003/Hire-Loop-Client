'use server'
import { serverMutation } from "../core/server";

export const submitApplication = async (newApplicationData) => {
    return serverMutation("/api/applications", newApplicationData);
}