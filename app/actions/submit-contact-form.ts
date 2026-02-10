"use server";

import { serverClient } from "@/sanity/lib/serverClient";

export async function submitContactForm(formData: FormData) {
	try {
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const subject = formData.get("subject") as string;
		const message = formData.get("message") as string;

		// Validate the required fields
		if (!name || !email || !message) {
			return {
				success: false,
				error: "Por favor, preencha todos os campos obrigatórios.",
			};
		}

		// Create the document in Sanity
		const result = await serverClient.create({
			_type: "contact",
			name,
			email,
			subject,
			message,
			submittedAt: new Date().toISOString(),
			status: "new",
		});

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		console.error("Erro ao enviar o formulário de contato:", error);
		return {
			success: false,
			error:
				"Falha ao enviar o formulário. Por favor, tente novamente mais tarde.",
		};
	}
}
