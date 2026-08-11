import { PrismaClient } from "@prisma/client";
import { IResetDataRepository } from "../interfaces.ts/IResetDataRepository";
import { seedDatabase } from "../seed";
import { execSync } from "child_process";

const prisma = new PrismaClient();
    export class ResetDataRepository implements IResetDataRepository{
        async resetData(): Promise<void> {
            try {
            // Desconecta o Prisma temporariamente para ele soltar o arquivo do banco
            // await prisma.$disconnect(); 

            // Roda o comando nativo do Prisma que apaga tudo (drop) e recria as tabelas do zero
            // O --force pula aquela pergunta de "Tem certeza?" (Y/N)
            // O --skip-generate evita gerar o client de novo atoa
            // O --skip-seed evita rodar o seed automático do Prisma (já que você roda o seu manual logo abaixo)
            execSync("npx prisma migrate reset --force --skip-generate --skip-seed", { 
                stdio: "inherit" // Mostra os logs do Prisma no seu terminal
            });

            console.log("✅ Banco destruído e recriado com sucesso! Iniciando o seed...");

            // Chama a sua função de seed para repovoar
            await seedDatabase();
            
            console.log("🚀 Reset completo finalizado!");

        } catch (error) {
            console.error("❌ Erro ao tentar dar o reset bruto:", error);
            throw error;
        }
    }
}