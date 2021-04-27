const CommandContext = require("../../CommandContext");
const util = require("../../../../utils/Utilities");

let defVar = (o, b, c) => (typeof o[b] === "undefined" ? c : o[b]);
module.exports = class Role {
    static parseOptions(options = {}) {
        return {
            ...options,
            highestRole: !!options.highestRole || false,

            errors: {
                invalidRole: "errors:invalidRole"
            }
        };
    }
    /**
     * 
     * @param {CommandContext} ctx 
     */
    static async parse(arg, ctx, opt) {
        const options = this.parseOptions(opt);

        let role;

        function getHighestRole() {
            const filteredRoles = ctx.guild.roles.filter(r => ctx.member.roles.includes(r.id));
            return filteredRoles.sort((a, b) => b.position - a.position)[0];
        }
        
        if (options.highestRole && !arg) return ctx.guild.roles.get(getHighestRole().id)
        else if (!arg) return null
        arg = arg.replace(/<|>|@|&/g, "");

        try {
            role = !/^\d+$/.test(arg) ? ctx.guild.roles.find(s => s.name.toLowerCase().includes(arg.toLowerCase())) : ctx.guild.roles.get(arg)
        } catch { }
        if (!role) throw new Error(options.errors.invalidRole)
        
        return role
    }
};