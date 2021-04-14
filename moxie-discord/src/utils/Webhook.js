const fetch = require("node-fetch");

module.exports = class Webhook {
    constructor(url) {
        this.url = url;
        this.payload = {};
    }
    setEmbed(embed) {
        let embeds = this.payload.embeds ? this.payload.embeds : [];
        embeds.push(embed);
        this.payload = Object.assign(this.payload, { embeds });
    }
    setMessage(message) {
        if (!message) throw new Error("Message cannot be null");
        this.payload = Object.assign(this.payload, { content: message });
    }
    build() {
        this._request(this.payload);
    }
    setName(name) {
        this.payload = Object.assign(this.payload, { username: name });
    }
    setAvatar(avatar_url) {
        this.payload = Object.assign(this.payload, { avatar_url });
    }
    _request(payload) {
        return fetch(this.url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
};
