const Logger = require("../utils/Logger");
const { PrismaClient } = require('@prisma/client');

module.exports = class DatabaseRegistry {
    constructor(client) {
        this.client = client;
        try {
            this.client.database = new PrismaClient();
            this.client.tempCache = new Map();

            Logger.info("Connected with PostgreSQL")
        } catch (error) {
            Logger.error("Database returned an " + error.stack)
        }
    }

    /**
     * 
     * @param {String} query Guild ID
     * @returns
     */
    async getGuildCache(query) {
        if (!await this.client.tempCache.has(query)) {
            let guild = await this.client.database.guilds.upsert({
                where: { id: query },
                update: {},
                create: { id: query },
            });
            await this.client.tempCache.set(query, { prefix: guild.prefix, lang: guild.lang });

            return await this.client.tempCache.get(query);
        }
        else return await this.client.tempCache.get(query);
    }
    async deleteGuildCache(query) {
        if (await this.client.tempCache.get(query)) {
            await this.client.tempCache.delete(query);
            return true;
        }
        else return false;
    }
    async createGuildCache(query) {
        if (await this.client.tempCache.has(query)) return true;
        else {
            let guild = await this.client.database.guilds.upsert({
                where: { id: query },
                update: {},
                create: { id: query },
            });
            await this.client.tempCache.set(query, { prefix: guild.prefix, lang: guild.lang });
            return true;
        }
    }
};