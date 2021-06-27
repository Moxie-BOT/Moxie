const ColorUtils = require('./ColorUtils')

module.exports = class EmbedBuilder {
  constructor (data = {}) {
    this.type = data.type || 'rich'
    this.title = 'title' in data ? data.title : null
    this.description = 'description' in data ? data.description : null
    this.url = 'url' in data ? data.url : null
    this.color =
            'color' in data ? ColorUtils.resolveColor(data.color) : null
    this.timestamp =
            'timestamp' in data ? new Date(data.timestamp).getTime() : null
    this.fields = []
    if (data.fields) {
      this.fields = data.fields ? data.fields : []
    }
    this.thumbnail = data.thumbnail
      ? {
          url: data.thumbnail.url,
          proxyURL: data.thumbnail.proxyURL || data.thumbnail.proxy_url,
          height: data.thumbnail.height,
          width: data.thumbnail.width
        }
      : null
    this.image = data.image
      ? {
          url: data.image.url,
          proxyURL: data.image.proxyURL || data.image.proxy_url,
          height: data.image.height,
          width: data.image.width
        }
      : null
    this.video = data.video
      ? {
          url: data.video.url,
          proxyURL: data.video.proxyURL || data.video.proxy_url,
          height: data.video.height,
          width: data.video.width
        }
      : null
    this.author = data.author
      ? {
          name: data.author.name,
          url: data.author.url,
          iconURL: data.author.iconURL || data.author.icon_url,
          proxyIconURL:
                    data.author.proxyIconURL || data.author.proxy_icon_url
        }
      : null

    this.provider = data.provider
      ? {
          name: data.provider.name,
          url: data.provider.name
        }
      : null
    this.footer = data.footer
      ? {
          text: data.footer.text,
          iconURL: data.footer.iconURL || data.footer.icon_url,
          proxyIconURL:
                    data.footer.proxyIconURL || data.footer.proxy_icon_url
        }
      : null
    this.files = data.files || []
  }

  addField (name, value, inline) {
    return this.fields.push({ name, value, inline })
  }

  setAuthor (name, iconURL, url) {
    this.author = { name, iconURL, url }
    return this
  }

  setColor (color) {
    this.color = ColorUtils.resolveColor(color)
    return this
  }

  setDescription (description) {
    this.description = description
    return this
  }

  setFooter (text, iconURL) {
    this.footer = { text, iconURL }
    return this
  }

  setImage (url) {
    this.image = { url }
    return this
  }

  setThumbnail (url) {
    this.thumbnail = { url }
    return this
  }

  setTimestamp (timestamp = Date.now()) {
    if (timestamp instanceof Date) timestamp = timestamp.getTime()
    this.timestamp = timestamp
    return this
  }

  setTitle (title) {
    this.title = title
    return this
  }

  setURL (url) {
    this.url = url
    return this
  }

  toJSON () {
    return {
      title: this.title,
      type: 'rich',
      description: this.description,
      url: this.url,
      timestamp: this.timestamp ? new Date(this.timestamp) : null,
      color: this.color,
      fields: this.fields,
      thumbnail: this.thumbnail,
      image: this.image,
      author: this.author
        ? {
            name: this.author.name,
            url: this.author.url,
            icon_url: this.author.iconURL
          }
        : null,
      footer: this.footer
        ? {
            text: this.footer.text,
            icon_url: this.footer.iconURL
          }
        : null
    }
  }
}
