export const SAFE_DOMAINS: string[] = [
    "google.com", "youtube.com", "facebook.com", "twitter.com", "x.com", "instagram.com", "whatsapp.com", "wikipedia.org", "amazon.com",
    "yahoo.com", "reddit.com", "linkedin.com", "netflix.com", "live.com", "office.com", "microsoft.com", "bing.com", "icloud.com",
    "apple.com", "zoom.us", "tiktok.com", "pinterest.com", "wordpress.com", "wordpress.org", "github.com", "gitlab.com", "bitbucket.org",
    "stackoverflow.com", "medium.com", "slack.com", "dropbox.com", "adobe.com", "canva.com", "notion.so", "figma.com", "spotify.com",
    "soundcloud.com", "twitch.tv", "discord.com", "telegram.org", "snapchat.com", "quora.com", "imdb.com", "roblox.com", "openai.com",
    "deepl.com", "booking.com", "airbnb.com", "tripadvisor.com", "expedia.com", "skyscanner.net", "kayak.com", "agoda.com", "uber.com",
    "lyft.com", "doordash.com", "grubhub.com", "ubereats.com", "etsy.com", "aliexpress.com", "alibaba.com", "ebay.com", "walmart.com",
    "target.com", "bestbuy.com", "homedepot.com", "lowes.com", "costco.com", "flipkart.com", "myntra.com", "ajio.com", "snapdeal.com",
    "jiomart.com", "tatacliq.com", "nykaa.com", "indiamart.com", "bigbasket.com", "bookmyshow.com", "paytmmall.com", "zomato.com", "swiggy.com",
    "dominos.com", "pizzahut.com", "mcdonalds.com", "kfc.com", "subway.com", "starbucks.com", "chipotle.com", "burgerking.com", "nike.com",
    "adidas.com", "hdfcbank.com", "icicibank.com", "axisbank.com", "kotak.com", "onlinesbi.com", "onlinesbi.sbi", "sbicard.com", "bankofbaroda.in",
    "pnbindia.in", "canarabank.in", "bankofindia.co.in", "unionbankofindia.co.in", "indianbank.in", "idbibank.in", "federalbank.co.in",
    "idfcfirstbank.com", "yesbank.in", "indusind.com", "rblbank.com", "boi.com", "sbi.bank.in", "hdfc.bank.in", "icici.bank.in", "axis.bank.in",
    "kotak.bank.in", "idfcfirst.bank.in", "indusind.bank.in", "federal.bank.in", "bankofbaroda.bank.in", "bankofindia.bank.in",
    "bankofmaharashtra.bank.in", "canara.bank.in", "pnb.bank.in", "unionbank.bank.in", "uco.bank.in", "indianbank.bank.in",
    "centralbankofindia.bank.in", "jkb.bank.in", "bandhan.bank.in", "csb.bank.in", "dcb.bank.in", "dhan.bank.in", "jana.bank.in",
    "shivalik.bank.in", "utkarsh.bank.in", "unity.bank.in", "rbi.org.in", "licindia.in", "irda.gov.in", "npci.org.in", "upi.org.in",
    "bhimupi.org.in", "paytm.com", "phonepe.com", "googlepay.in", "razorpay.com", "billdesk.com", "ccavenue.com", "stripe.com", "paypal.com",
    "skrill.com", "wise.com", "revolut.com", "squareup.com", "india.gov.in", "uidai.gov.in", "myaadhaar.uidai.gov.in", "incometax.gov.in",
    "cbic.gov.in", "mha.gov.in", "mparivahan.gov.in", "parivahan.gov.in", "digilocker.gov.in", "irctc.co.in", "passportindia.gov.in",
    "timesofindia.com", "indiatoday.in", "hindustantimes.com", "indianexpress.com", "livemint.com", "ndtv.com", "moneycontrol.com",
    "zeenews.india.com", "news18.com", "thehindu.com", "economictimes.indiatimes.com", "business-standard.com", "scroll.in", "firstpost.com",
    "indiatvnews.com", "aajtak.in", "bbc.com", "cnn.com", "foxnews.com", "nytimes.com", "washingtonpost.com", "theguardian.com", "bloomberg.com",
    "reuters.com", "cnbc.com", "forbes.com", "wsj.com", "time.com", "aljazeera.com", "dw.com", "ft.com", "economist.com", "yahoo.co.jp", "qq.com",
    "weibo.com", "baidu.com", "taobao.com", "jd.com", "tmall.com", "vk.com", "yandex.ru", "naver.com", "daum.net", "sina.com.cn", "163.com",
    "mail.ru", "sohu.com", "ok.ru", "huya.com", "douyu.com", "bilibili.com", "xfinity.com", "att.com", "verizon.com", "spectrum.com", "comcast.com",
    "cloudflare.com", "akamai.com", "digitalocean.com", "linode.com", "vultr.com", "aws.amazon.com", "azure.microsoft.com", "cloud.google.com",
    "oracle.com", "ibm.com", "heroku.com", "vercel.com", "netlify.app", "firebase.google.com", "supabase.com", "mongodb.com", "mysql.com",
    "postgresql.org", "redis.io", "elastic.co", "kubernetes.io", "docker.com", "git-scm.com", "nodejs.org", "python.org", "php.net", "golang.org",
    "rust-lang.org", "typescriptlang.org", "npmjs.com", "pypi.org", "rubygems.org", "developer.mozilla.org", "w3schools.com", "codecademy.com",
    "coursera.org", "udemy.com", "edx.org", "khanacademy.org", "byjus.com", "unacademy.com", "nptel.ac.in", "swayam.gov.in", "udacity.com",
    "pluralsight.com", "duolingo.com", "brilliant.org", "skillshare.com", "masterclass.com", "chegg.com", "quizlet.com", "indeed.com",
    "linkedin.com", "naukri.com", "monster.com", "glassdoor.com", "timesjobs.com", "upwork.com", "freelancer.com", "fiverr.com", "toptal.com",
    "angel.co", "foundit.in", "instahyre.com", "shine.com", "gmail.com", "outlook.com", "proton.me", "zoho.com", "yandex.com", "gmx.com",
    "yahoomail.com", "duckduckgo.com", "yahoo.co.in", "ask.com", "ecosia.org", "aol.com", "archive.org", "waybackmachine.org", "scribd.com",
    "slideshare.net", "researchgate.net", "academia.edu", "jstor.org", "springer.com", "sciencedirect.com", "nature.com", "ieee.org", "arxiv.org",
    "nih.gov", "who.int", "cdc.gov", "mayoclinic.org", "webmd.com", "healthline.com", "verywellhealth.com", "nhs.uk", "clevelandclinic.org",
    "myfitnesspal.com", "fitbit.com", "strava.com", "runkeeper.com", "garmin.com", "decathlon.in", "firstcry.com", "pepperfry.com", "grofers.com",
    "blinkit.com", "urbancompany.com", "justdial.com", "olx.in", "magicbricks.com", "99acres.com", "makemytrip.com", "yatra.com", "goibibo.com",
    "cleartrip.com", "redbus.in", "rapido.bike", "ola.cabs", "olaelectric.com", "tvs.com", "hero.com", "marutisuzuki.com", "tata.com", "mahindra.com",
    "hyundai.com", "kia.com", "mercedes-benz.com", "bmw.com", "audi.com", "tesla.com", "toyota.com", "honda.com", "ford.com", "chevrolet.com",
    "volkswagen.com", "volvo.com", "jaguar.com", "landrover.com", "rolls-royce.com", "lamborghini.com", "ferrari.com", "porsche.com", "bugatti.com",
    "mclaren.com", "leagueoflegends.com", "playstation.com", "xbox.com", "nintendo.com", "epicgames.com", "steampowered.com", "ea.com", "ubisoft.com",
    "rockstargames.com", "riotgames.com", "battle.net", "minecraft.net", "fortnite.com", "gog.com", "origin.com", "itch.io", "tencent.com",
    "sony.com", "samsung.com", "lg.com", "dell.com", "hp.com", "lenovo.com", "asus.com", "acer.com", "msi.com", "huawei.com", "xiaomi.com", "oneplus.com",
    "realme.com", "oppo.com", "vivo.com", "nokia.com", "motorola.com", "hotstar.com", "disneyplus.com", "jiocinema.com", "sonyliv.com", "zee5.com",
    "voot.com", "mxplayer.in", "primevideo.com", "wynk.in", "gaana.com", "saavn.com", "zoom.us", "teams.microsoft.com", "meet.google.com", "webex.com",
    "gotomeeting.com", "bluejeans.com", "clickup.com", "trello.com", "asana.com", "monday.com", "jira.com", "confluence.atlassian.com", "basecamp.com",
    "todoist.com", "evernote.com", "onenote.com", "keep.google.com", "obsidian.md", "rocket.chat", "mattermost.com", "loom.com", "miro.com",
    "lucidchart.com", "draw.io", "behance.net", "dribbble.com", "unsplash.com", "pexels.com", "pixabay.com", "freepik.com", "icons8.com", "flaticon.com",
    "fontawesome.com", "fonts.google.com", "dafont.com", "1001fonts.com"
];

export function isSafeHost(hostname: string): boolean {
    const host = hostname.toLowerCase();

    return SAFE_DOMAINS.some(domain => {
        const d = domain.toLowerCase();

        // exact match
        if (host === d) return true;

        // suffix / subdomain match: *.domain
        if (host.endsWith("." + d)) return true;

        // prefix match (e.g. domain plus extra tokens before TLD)
        if (host.startsWith(d)) return true;

        // loose contains as segment (optional, safer if you require dot or hyphen boundaries)
        if (host.includes("." + d) || host.includes(d + ".")) return true;

        return false;
    });
}
