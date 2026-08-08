#!/usr/bin/env python3
"""Generate the six HTML pages of the simpli cafe site.

The site itself is plain static HTML — the generated files are committed and
deploy as-is, with no build step on the server. This script exists so the
copy lives in one place: the Greek and English trees are the same page
rendered from two dictionaries, which is the only sane way to keep two
languages from drifting apart.

    python3 site.build.py        # rewrites index.html, about/, contact/, en/

Edit the copy HERE, not in the generated HTML — running this again overwrites
those files. Everything marked PLACEHOLDER needs the café's real details.
"""

from __future__ import annotations

import html
import pathlib
import urllib.parse

ROOT = pathlib.Path(__file__).parent

# --- Details ---------------------------------------------------------------

# PLACEHOLDER: the domain is still a stand-in.
SITE = "https://simplicafe.gr"

# The address, set in capitals as the café writes it.
ADDRESS = {"el": "ΒΟΡΕΑΔΩΝ 2, 16672 ΒΑΡΗ", "en": "VOREADON 2, 16672 VARI"}

# The phone. PHONE_TEL is what the link dials; PHONE is what the page shows —
# grouped 3-3-4 as Greek landlines are written, with the country code added
# for the English page, where the reader may be abroad.
PHONE_TEL = "+302109655160"
PHONE = {"el": "210 965 5160", "en": "+30 210 965 5160"}

# What the map centres on. Latin script geocodes more reliably than Greek,
# and the country keeps it out of the wrong Vari.
MAP_QUERY = "Voreadon 2, 16672 Vari, Greece"

# No email or social yet — deliberately left off rather than shown as a
# placeholder. To add one: put it here, drop an .info-item into contact() and
# a line into the footer.

# Opening hours, mirrored in HOURS in assets/js/site.js and in the JSON-LD
# below. All three have to agree.
HOURS_ROWS = [
    ("1,2,3,4,5", {"el": "Δευτέρα – Παρασκευή", "en": "Monday – Friday"}, "07:00 – 19:00"),
    ("6", {"el": "Σάββατο", "en": "Saturday"}, "07:00 – 18:00"),
    ("0", {"el": "Κυριακή", "en": "Sunday"}, {"el": "Κλειστά", "en": "Closed"}),
]

# --- Icons -----------------------------------------------------------------

def _svg(body: str, width: str = "1.5") -> str:
    return (
        f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{width}" '
        f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>'
    )


ICONS = {
    "cup": _svg(
        '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/>'
        '<path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/>'
        '<path d="M8 3c-.6 1 .6 1.8 0 3M12 2.5c-.7 1.2.7 2 0 3.5"/>'
    ),
    "croissant": _svg(
        '<path d="M3 14c0-4 4-7 9-7s9 3 9 7c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3Z"/>'
        '<path d="M8 8.5 7 6M12 7.6V5M16 8.5 17 6"/>'
    ),
    "glass": _svg('<path d="M5 4h14l-6 8v7h3M8 19h3M5 4l14 0"/><path d="M6.6 8.5h10.8"/>'),
    "pin": _svg('<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
    "phone": _svg(
        '<path d="M5 4h3.5l1.8 4.2-2.2 1.4a12 12 0 0 0 5.3 5.3l1.4-2.2L19 14.5V18a2 2 0 0 1-2.2 2'
        'A15.5 15.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z"/>'
    ),
    "mail": _svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.7 7 7.2 5.2a2 2 0 0 0 2.2 0L20.3 7"/>'),
    "instagram": _svg(
        '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>'
        '<circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>'
    ),
    "clock": _svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>'),
    "sun": _svg(
        '<circle cx="12" cy="12" r="4"/>'
        '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2'
        'M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
    ),
    "pin_cup": (
        '<svg viewBox="0 0 48 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
        '<path d="M24 1.6c-10.2 0-18.4 8.2-18.4 18.3C5.6 32.7 24 58 24 58s18.4-25.3 18.4-38.1'
        'C42.4 9.8 34.2 1.6 24 1.6Z" fill="#101010" stroke="#ffffff" stroke-width="2.4"/>'
        '<g fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" '
        'stroke-linejoin="round">'
        '<path d="M15.4 15.2h12.4v6.6a6.2 6.2 0 0 1-6.2 6.2h0a6.2 6.2 0 0 1-6.2-6.2v-6.6Z"/>'
        '<path d="M27.8 16.6h1.7a3 3 0 0 1 0 6h-1.7"/>'
        '<path d="M18.8 10.6c-.5.9.5 1.6 0 2.6M23.4 10.2c-.6 1 .6 1.7 0 2.9"/>'
        "</g></svg>"
    ),
    "arrow": _svg('<path d="M5 12h14M13 6l6 6-6 6"/>', width="1.8"),
}

# --- Copy ------------------------------------------------------------------
# Greek is the primary language: it sits at the root of the site, and English
# lives under /en/. Both dictionaries have the same shape.

COPY = {
    "el": {
        "locale": "el_GR",
        "nav": {"home": "Αρχική", "about": "Το μαγαζί", "contact": "Επικοινωνία"},
        "skip": "Μετάβαση στο περιεχόμενο",
        "nav_label": "Κύριο μενού",
        "home_label": "simpli cafe — αρχική",
        "meta": {
            "home": (
                "simpli cafe — καφές, σνακ και ροφήματα όλη μέρα",
                "Ποιοτικός καφές, φρέσκα σνακ και ροφήματα όλη μέρα, σε μια μικρή γωνιά "
                "της Βάρης. Yours Simpli!",
            ),
            "about": (
                "Το μαγαζί — simpli cafe",
                "Μια μικρή καφετέρια στη Βάρη, από τους ανθρώπους που θα δεις πίσω από "
                "τον πάγκο. Η ιστορία μας και η ξύλινη ταμπέλα που μας έδωσε το όνομα.",
            ),
            "contact": (
                "Επικοινωνία — simpli cafe",
                "Πού θα μας βρεις, ώρες λειτουργίας, τηλέφωνο και χάρτης. Πέρνα να πούμε "
                "ένα γεια και να πιεις έναν καφέ.",
            ),
        },
        "hero": {
            "eyebrow": "Καφετέρια · Βάρη",
            "h1": "Καλός καφές,\nαπλά.",
            "lede": (
                "Εσπρέσο όπως πρέπει, φρέσκα σνακ κάθε πρωί και ένα σκαμπό στον ήλιο για να "
                "τα απολαύσεις. Τίποτα περίπλοκο — μόνο πράγματα φτιαγμένα σωστά."
            ),
            "cta1": "Πού θα μας βρεις",
            "cta2": "Το μαγαζί μας",
            "float1": "Στη γωνία, με τραπεζάκια έξω",
            "float2": "Ανοιχτά από νωρίς, Δευτέρα – Σάββατο",
            "brand_line": "Good coffee, kept simple.",
            "photo_alt": "Η ξύλινη ταμπέλα simpli cafe, κρεμασμένη πάνω από το πεζοδρόμιο με φόντο τον γαλάζιο ουρανό.",
        },
        "cards_head": {
            "eyebrow": "Τι κάνουμε",
            "h2": "Λίγα πράγματα, σωστά φτιαγμένα",
        },
        "cards": [
            (
                "cup",
                "Καφές που αξίζει",
                "Εσπρέσο καβουρδισμένος για εμάς στην Αττική και αλεσμένος τη στιγμή. "
                "Φρέντο, φίλτρου, flat white ή ελληνικός στο μπρίκι — όπως τον πίνεις.",
            ),
            (
                "croissant",
                "Φρέσκα σνακ",
                "Κρουασάν, κουλούρι, τυρόπιτα και ό,τι έβγαλε ο φούρνος το πρωί. "
                "Τοστ, σάντουιτς και γλυκά όλη μέρα.",
            ),
            (
                "sun",
                "Μια θέση στον ήλιο",
                "Τραπεζάκια στο πεζοδρόμιο, wifi που δουλεύει και κανείς δεν σε βιάζει. "
                "Μείνε για έναν ή για όλο το απόγευμα.",
            ),
        ],
        "statement": {
            "text": "Το Simpli Cafe φροντίζει να σερβίρει ποιοτικό καφέ, σνακ και ροφήματα όλη μέρα.",
            "sign": "Yours Simpli!",
            "photo_alt": "Η πρόσοψη του simpli cafe, με τα ψηλά τραπεζάκια στο πεζοδρόμιο.",
            "cup_alt": "Καφές σε ποτήρι take away με το σήμα του simpli cafe, πάνω σε ξύλινο τραπέζι στον ήλιο, δίπλα σε ένα φυτό.",
        },
        "home_cta": {
            "h2": "Πέρνα μια βόλτα",
            "p": "Είμαστε εδώ από νωρίς το πρωί. Χωρίς κράτηση, χωρίς φασαρία — απλώς σπρώξε την πόρτα.",
            "cta1": "Δες πού είμαστε",
            "cta2": "Η ιστορία μας",
        },
        "about": {
            "eyebrow": "Το μαγαζί",
            "h1": "Ένα μικρό μαγαζί, από τους ανθρώπους πίσω από τον πάγκο",
            "lede": (
                "Χωρίς κεντρικά γραφεία και εγχειρίδια franchise. Μια γωνία, μια μηχανή που "
                "ξέρουμε απ' έξω κι ανακατωτά, και τα ίδια πρόσωπα κάθε πρωί."
            ),
            "story_h2": "Πώς ξεκίνησε",
            "story": [
                "Πήραμε το μαγαζί όταν ήταν ακόμα ένα κλειστό περίπτερο, κρατήσαμε το κίτρινο "
                "ρολό επειδή μας άρεσε, και ανοίξαμε με μια μηχανή espresso, ένα ψυγείο και "
                "οκτώ σκαμπό. Αυτό ήταν όλο το σχέδιο.",
                "Το όνομα ήρθε πριν από όλα τα υπόλοιπα. Θέλαμε ένα μέρος που κάνει λίγα "
                "πράγματα σωστά αντί για τα πάντα μέτρια — καλό καφέ, κάτι φρέσκο να τον "
                "συνοδεύει, και μια θέση για δέκα λεπτά πριν ξεκινήσει η μέρα. Απλό, αλλά όχι "
                "πρόχειρο. Υπάρχει διαφορά, και φαίνεται.",
                "Χρόνια μετά, ο κατάλογος έχει μεγαλώσει κατά έξι γραμμές. Τα σκαμπό είναι τα ίδια.",
            ],
            "story_alt": "Η πρόσοψη του simpli cafe με την ανοιχτή πόρτα και τα τραπεζάκια έξω.",
            "values_head": {"eyebrow": "Τι μας νοιάζει", "h2": "Τρεις κανόνες που δεν έχουμε σπάσει"},
            "values": [
                (
                    "cup",
                    "Καφές που θα πίναμε κι εμείς",
                    "Ένα χαρμάνι espresso, καβουρδισμένο για εμάς στην Αττική και φρέσκο κάθε "
                    "εβδομάδα. Το ρυθμίζουμε κάθε πρωί και το ξαναδοκιμάζουμε το μεσημέρι.",
                ),
                (
                    "croissant",
                    "Φτιαγμένα εδώ",
                    "Οι πίτες, τα γλυκά και οι γεμίσεις γίνονται στην κουζίνα μας. Το ψωμί "
                    "έρχεται από φούρνο τεσσάρων δρόμων πιο κάτω.",
                ),
                (
                    "sun",
                    "Πρόσωπα, όχι παραγγελίες",
                    "Μαθαίνουμε πώς τον πίνεις. Αν είσαι από τους δικούς μας, ο καφές ξεκινά "
                    "πριν φτάσεις στον πάγκο.",
                ),
            ],
            "sign_eyebrow": "Η ταμπέλα",
            "sign_h2": "Μία σανίδα, ένα απόγευμα",
            "sign_p": [
                "Η ταμπέλα πάνω από το πεζοδρόμιο κόπηκε από ένα κομμάτι πεύκο και έμεινε με "
                "τη φυσική της άκρη, οπότε καμία πλευρά δεν είναι ίδια με την άλλη. Τα "
                "γράμματα σκαλίστηκαν στο χέρι.",
                "Υπάρχει ένας ρόζος στο ξύλο που έπεσε ακριβώς εκεί που θα πήγαινε η τελεία "
                "του τελευταίου <em>i</em>. Κανείς δεν το σχεδίασε. Αποφασίσαμε ότι αυτό είναι "
                "το λογότυπο και δεν φτιάξαμε ποτέ άλλο — την ίδια καφέ τελεία θα τη βρεις σε "
                "κάθε γωνιά αυτού του site.",
            ],
            "sign_alt": "Η ξύλινη ταμπέλα simpli cafe κρεμασμένη πάνω από τον δρόμο.",
        },
        "contact": {
            "eyebrow": "Επικοινωνία",
            "h1": "Πέρασε από το μαγαζί",
            "lede": "Χωρίς κράτηση — σχεδόν πάντα υπάρχει ένα σκαμπό ελεύθερο. Εδώ είναι η διεύθυνση, οι ώρες μας και ο χάρτης.",
            "address_label": "Διεύθυνση",
            "phone_label": "Τηλέφωνο",
            "call": "Κάλεσέ μας",
            "hours_label": "Ώρες λειτουργίας",
            "invite_h2": "Πέρνα να πούμε ένα γεια και να πιεις έναν καφέ",
            "invite_p": "Στη γωνία, με τα τραπεζάκια έξω. Θα σε περιμένουμε.",
            "find_eyebrow": "Ο χάρτης",
            "find_h2": "Πού θα μας βρεις",
            "find_p": "Βρισκόμαστε στη Βάρη, στην περιοχή της Βάρκιζας. Μόλις 10 λεπτά με τα πόδια από την παραλία.",
            "map_label": "Χάρτης με την τοποθεσία του simpli cafe στη Βάρη",
            "map_cta": "Άνοιγμα στους χάρτες Google",
            "directions": "Οδηγίες",
        },
        "footer": {
            "blurb": "Μια μικρή καφετέρια στη Βάρη, δέκα λεπτά από την παραλία. Καφές, κάτι φρέσκο να τον συνοδεύει, και μια θέση να καθίσεις.",
            "visit": "Επισκέψου μας",
            "pages": "Σελίδες",
            "rights": "Με επιφύλαξη παντός δικαιώματος.",
            "by": "Κατασκευή ιστοσελίδας",
        },
    },
    "en": {
        "locale": "en_GB",
        "nav": {"home": "Home", "about": "About", "contact": "Contact"},
        "skip": "Skip to content",
        "nav_label": "Main",
        "home_label": "simpli cafe — home",
        "meta": {
            "home": (
                "simpli cafe — coffee, snacks and beverages all day",
                "Quality coffee, fresh snacks and beverages all day, in a small corner of "
                "Vari. Yours Simpli!",
            ),
            "about": (
                "About us — simpli cafe",
                "A small café in Vari, run by the people you'll see behind the counter. "
                "Our story, and the wooden sign that gave us our name.",
            ),
            "contact": (
                "Contact — simpli cafe",
                "Where to find us, opening hours, phone and map. Come say hi and grab a coffee.",
            ),
        },
        "hero": {
            "eyebrow": "Corner café · Vari",
            "h1": "Good coffee,\nkept simple.",
            "lede": (
                "Espresso pulled properly, fresh snacks each morning, and a stool in the sun "
                "to enjoy them on. Nothing fussy — just things made well."
            ),
            "cta1": "Find us",
            "cta2": "About us",
            "float1": "On the corner, tables outside",
            "float2": "Open from early, Monday to Saturday",
            "brand_line": "",
            "photo_alt": "The hand-cut wooden simpli cafe sign hanging above the pavement against a blue sky.",
        },
        "cards_head": {"eyebrow": "What we do", "h2": "A few things, done properly"},
        "cards": [
            (
                "cup",
                "Coffee worth the walk",
                "A blend roasted for us here in Attica and ground to order. Freddo, filter, "
                "flat white or a proper Greek coffee in the briki — however you take it.",
            ),
            (
                "croissant",
                "Fresh snacks",
                "Croissants, koulouri, tiropita and whatever came out of the oven this "
                "morning. Toasties, sandwiches and something sweet all day.",
            ),
            (
                "sun",
                "A stool in the sun",
                "Tables out on the pavement, wifi that works, and nobody hurrying you along. "
                "Stay for one, stay for the afternoon.",
            ),
        ],
        "statement": {
            "text": "Simpli Cafe strives to serve quality coffee, snacks and beverages all day.",
            "sign": "Yours Simpli!",
            "photo_alt": "The simpli cafe shopfront, with high tables out on the pavement.",
            "cup_alt": "A simpli cafe takeaway coffee on a sunlit wooden table, next to a potted plant.",
        },
        "home_cta": {
            "h2": "Come by",
            "p": "We're here from early. No booking, no fuss — just push the door.",
            "cta1": "See where we are",
            "cta2": "Our story",
        },
        "about": {
            "eyebrow": "About us",
            "h1": "A small place, run by the people behind the counter",
            "lede": (
                "No head office, no franchise manual. Just a room on a corner, a machine we "
                "know inside out, and the same faces most mornings."
            ),
            "story_h2": "How it started",
            "story": [
                "We took the shop over when it was still a shuttered kiosk, kept the yellow "
                "shutter because we liked it, and opened with an espresso machine, a fridge "
                "and eight stools. That was the whole plan.",
                "The name came before anything else. We wanted a place that did a few things "
                "properly rather than everything adequately — good coffee, something fresh to "
                "go with it, and somewhere to sit for ten minutes before the day starts. "
                "Simple, but not careless. There's a difference, and you can taste it.",
                "Years later the menu has grown by about six lines. The stools are the same ones.",
            ],
            "story_alt": "The simpli cafe shopfront with its open door and tables outside.",
            "values_head": {"eyebrow": "What we care about", "h2": "Three rules we haven't broken yet"},
            "values": [
                (
                    "cup",
                    "Coffee we'd drink ourselves",
                    "One espresso blend, roasted for us in Attica and delivered every week. We "
                    "dial it in each morning and taste it again after lunch.",
                ),
                (
                    "croissant",
                    "Made here, not shipped in",
                    "The pies, the cakes and the sandwich fillings are made in our kitchen. "
                    "Bread comes from a bakery four streets away.",
                ),
                (
                    "sun",
                    "Faces, not orders",
                    "We learn how you take it. If you're a regular you'll get a cup started "
                    "before you've reached the counter.",
                ),
            ],
            "sign_eyebrow": "The sign",
            "sign_h2": "One board, one afternoon",
            "sign_p": [
                "The sign over the pavement was cut from a single length of pine and left with "
                "its live edge on, so no two sides match. The letters were routed by hand.",
                "There's a knot in the wood that landed exactly where the dot over the last "
                "<em>i</em> should go. Nobody planned it. We decided that was the logo and "
                "never drew another one — you'll find that same brown dot in every corner of "
                "this site.",
            ],
            "sign_alt": "The wooden simpli cafe sign hanging above the street.",
        },
        "contact": {
            "eyebrow": "Contact",
            "h1": "Come by the shop",
            "lede": "No booking needed — there's almost always a stool free. Here's the address, our hours and the map.",
            "address_label": "Address",
            "phone_label": "Phone",
            "call": "Call us",
            "hours_label": "Opening hours",
            "invite_h2": "Come say hi and grab a coffee",
            "invite_p": "On the corner, with the tables outside. We'll be here.",
            "find_eyebrow": "The map",
            "find_h2": "Where to find us",
            "find_p": "We are located in Vari in the province of Varkiza. Only a 10 minute walk from the beach.",
            "map_label": "Map showing the location of simpli cafe in Vari",
            "map_cta": "Open in Google Maps",
            "directions": "Directions",
        },
        "footer": {
            "blurb": "A small café in Vari, ten minutes from the beach. Coffee, something fresh to go with it, and a place to sit.",
            "visit": "Visit",
            "pages": "Pages",
            "rights": "All rights reserved.",
            "by": "Website by",
        },
    },
}

LANGS = ["el", "en"]
PAGES = ["home", "about", "contact"]

# Where each page lives, relative to the site root. Greek is the root; English
# sits under /en/.
def path_of(lang: str, page: str) -> str:
    parts = ([] if lang == "el" else ["en"]) + ([] if page == "home" else [page])
    return "/".join(parts) + ("/" if parts else "")


def depth_of(lang: str, page: str) -> int:
    return len([p for p in path_of(lang, page).split("/") if p])


def link(from_lang: str, from_page: str, to_lang: str, to_page: str) -> str:
    """A relative href from one page to another, so the site works in a
    subfolder as happily as it does on its own domain."""
    up = "../" * depth_of(from_lang, from_page)
    target = path_of(to_lang, to_page)
    return (up + target) or "./"


def asset(lang: str, page: str, rel: str) -> str:
    return "../" * depth_of(lang, page) + "assets/" + rel


MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote(MAP_QUERY)
MAPS_EMBED = "https://www.google.com/maps?q=" + urllib.parse.quote(MAP_QUERY) + "&output=embed"


def e(text: str) -> str:
    return html.escape(text, quote=False)


# --- Shared chunks ---------------------------------------------------------

def head(lang: str, page: str) -> str:
    c = COPY[lang]
    title, description = c["meta"][page]
    canonical = SITE + "/" + path_of(lang, page)
    image = SITE + "/assets/img/" + ("sign.jpg" if page != "about" else "storefront.jpg")

    alternates = "\n".join(
        f'    <link rel="alternate" hreflang="{alt}" href="{SITE}/{path_of(alt, page)}" />'
        for alt in LANGS
    )

    return f"""    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{e(title)}</title>
    <meta name="description" content="{e(description)}" />
    <link rel="canonical" href="{canonical}" />
{alternates}
    <link rel="alternate" hreflang="x-default" href="{SITE}/{path_of('el', page)}" />
    <meta name="theme-color" content="#ffffff" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="simpli cafe" />
    <meta property="og:locale" content="{c['locale']}" />
    <meta property="og:title" content="{e(title)}" />
    <meta property="og:description" content="{e(description)}" />
    <meta property="og:url" content="{canonical}" />
    <meta property="og:image" content="{image}" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" href="{asset(lang, page, 'favicon.svg')}" type="image/svg+xml" />
    <link rel="preload" href="{asset(lang, page, 'fonts/inter-latin.woff2')}" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="{asset(lang, page, 'css/site.css')}" />"""


def logo(lang: str, page: str, big: bool = False) -> str:
    cls = "logo logo--lg" if big else "logo"
    return f"""<a class="{cls}" href="{link(lang, page, lang, 'home')}" aria-label="{e(COPY[lang]['home_label'])}">
          <span class="logo__name" aria-hidden="true">simplı<span class="logo__dot"></span></span>
          <span class="logo__sub" aria-hidden="true">cafe</span>
        </a>"""


def header(lang: str, page: str) -> str:
    c = COPY[lang]
    other = "en" if lang == "el" else "el"

    links = []
    for p in PAGES:
        current = ' aria-current="page"' if p == page else ""
        links.append(f'<a class="nav__link" href="{link(lang, page, lang, p)}"{current}>{e(c["nav"][p])}</a>')

    # Greek first, always — the café is in Greece and its neighbours read Greek.
    lang_links = []
    for code, label in (("el", "ΕΛ"), ("en", "EN")):
        current = ' aria-current="true"' if code == lang else ""
        href = link(lang, page, code, page)
        lang_links.append(f'<a href="{href}" lang="{code}" hreflang="{code}"{current}>{label}</a>')

    return f"""    <header class="header">
      <div class="wrap header__inner">
        {logo(lang, page)}
        <nav class="nav" aria-label="{e(c['nav_label'])}">
          {"".join(links)}
        </nav>
        <span class="lang">{"".join(lang_links)}</span>
      </div>
    </header>"""


def footer(lang: str, page: str) -> str:
    c = COPY[lang]["footer"]
    pages = "".join(
        f'<li><a href="{link(lang, page, lang, p)}">{e(COPY[lang]["nav"][p])}</a></li>' for p in PAGES
    )
    return f"""    <footer class="footer">
      <div class="wrap footer__grid">
        <div>
          {logo(lang, page)}
          <p style="margin-top: 1rem; max-width: 32ch">{e(c['blurb'])}</p>
        </div>

        <div>
          <h4>{e(c['visit'])}</h4>
          <ul>
            <li>{e(ADDRESS[lang])}</li>
            <li><a href="tel:{PHONE_TEL}">{e(PHONE[lang])}</a></li>
            <li><a href="{MAPS_LINK}" rel="noopener">{e(COPY[lang]['contact']['map_cta'])}</a></li>
          </ul>
        </div>

        <div>
          <h4>{e(c['pages'])}</h4>
          <ul>{pages}</ul>
        </div>
      </div>

      <div class="wrap footer__bottom">
        <span>© <span data-year>2026</span> simpli cafe. {e(c['rights'])}</span>
        <span>{e(c['by'])} <a href="https://midastechnology.com" rel="noopener">Midas Technology</a></span>
      </div>
    </footer>"""


def document(lang: str, page: str, body: str) -> str:
    return f"""<!doctype html>
<html lang="{lang}">
  <head>
{head(lang, page)}
  </head>

  <body>
    <a class="skip" href="#main">{e(COPY[lang]['skip'])}</a>

{header(lang, page)}

    <main id="main">
{body}
    </main>

{footer(lang, page)}

    <script src="{asset(lang, page, 'js/site.js')}" defer></script>
  </body>
</html>
"""


def cards(items) -> str:
    out = []
    for i, (icon, title, text) in enumerate(items):
        delay = f' data-delay="{i * 90}"' if i else ""
        out.append(
            f"""            <article class="glass card reveal"{delay}>
              <span class="card__icon">{ICONS[icon]}</span>
              <h3>{e(title)}</h3>
              <p>{e(text)}</p>
            </article>"""
        )
    return "\n".join(out)


# --- Pages -----------------------------------------------------------------

def jsonld(lang: str) -> str:
    """Local-search markup — this is what puts a café in Google's map pack."""
    return f"""    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        "name": "simpli cafe",
        "url": "{SITE}/{path_of(lang, 'home')}",
        "image": "{SITE}/assets/img/storefront.jpg",
        "inLanguage": "{lang}",
        "servesCuisine": ["Coffee", "Snacks", "Beverages"],
        "priceRange": "€",
        "telephone": "{PHONE['en']}",
        "hasMap": "{MAPS_LINK}",
        "address": {{
          "@type": "PostalAddress",
          "streetAddress": "VOREADON 2",
          "postalCode": "16672",
          "addressLocality": "VARI",
          "addressRegion": "Attica",
          "addressCountry": "GR"
        }},
        "openingHoursSpecification": [
          {{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "19:00"}},
          {{"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "07:00", "closes": "18:00"}}
        ]
      }}
    </script>"""


def home(lang: str) -> str:
    c = COPY[lang]
    h = c["hero"]
    s = c["statement"]
    cta = c["home_cta"]
    headline = "<br />".join(e(part) for part in h["h1"].split("\n"))
    # On the Greek page the English strapline rides under the headline; the
    # English page already says it in the headline itself.
    brand_line = f'<span class="brand-line">{e(h["brand_line"])}</span>' if h["brand_line"] else ""

    return f"""      <!-- Hero ------------------------------------------------------ -->
      <section class="hero">
        <div class="wrap hero__grid">
          <div>
            <p class="eyebrow">{e(h['eyebrow'])}</p>
            <h1>{headline}</h1>
            {brand_line}
            <p class="lede">{e(h['lede'])}</p>
            <div class="btn-row" style="margin-top: 2rem">
              <a class="btn btn--primary" href="{link(lang, 'home', lang, 'contact')}">{e(h['cta1'])}</a>
              <a class="btn btn--glass" href="{link(lang, 'home', lang, 'about')}">{e(h['cta2'])}</a>
            </div>
            <div class="hero__facts">
              <span class="chip" data-open-now>{e(h['float2'])}</span>
            </div>
          </div>

          <figure class="hero__figure reveal">
            <img
              src="{asset(lang, 'home', 'img/sign.jpg')}"
              width="1290"
              height="957"
              alt="{e(h['photo_alt'])}"
              fetchpriority="high"
            />
            <figcaption class="glass hero__float">
              <span>{ICONS['pin']}{e(h['float1'])}</span>
              <span>{ICONS['clock']}{e(h['float2'])}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- What we do ------------------------------------------------ -->
      <section class="section band-wash">
        <div class="wrap">
          <div class="head head--center reveal">
            <p class="eyebrow">{e(c['cards_head']['eyebrow'])}</p>
            <h2>{e(c['cards_head']['h2'])}</h2>
          </div>
          <div class="grid grid--3">
{cards(c['cards'])}
          </div>
        </div>
      </section>

      <!-- The line the whole place runs on -------------------------- -->
      <section class="section">
        <div class="wrap">
          <div class="split split--stretch">
            <div class="split__media reveal">
              <img
                src="{asset(lang, 'home', 'img/coffee.jpg')}"
                width="864"
                height="1000"
                alt="{e(s['cup_alt'])}"
                loading="lazy"
              />
            </div>

            <div class="glass statement statement--inline reveal" data-delay="90">
              <p>{e(s['text'])}</p>
              <span class="statement__sign">{e(s['sign'])}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- The place ------------------------------------------------- -->
      <section class="section section--tight">
        <div class="wrap">
          <figure class="photo-full reveal" style="margin-top: 0">
            <img
              src="{asset(lang, 'home', 'img/storefront.jpg')}"
              width="654"
              height="862"
              alt="{e(s['photo_alt'])}"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <!-- Come by --------------------------------------------------- -->
      <section class="section">
        <div class="wrap">
          <div class="glass statement reveal">
            <h2>{e(cta['h2'])}</h2>
            <p class="lede" style="margin-top: 1rem; font-size: 1.1rem">{e(cta['p'])}</p>
            <div class="btn-row" style="justify-content: center; margin-top: 2rem">
              <a class="btn btn--primary" href="{link(lang, 'home', lang, 'contact')}">{e(cta['cta1'])}</a>
              <a class="btn btn--glass" href="{link(lang, 'home', lang, 'about')}">{e(cta['cta2'])}</a>
            </div>
          </div>
        </div>
      </section>"""


def about(lang: str) -> str:
    a = COPY[lang]["about"]
    story = "\n".join(f"              <p>{e(p)}</p>" for p in a["story"])
    sign = "\n".join(f"              <p>{p}</p>" for p in a["sign_p"])

    return f"""      <section class="pagehead">
        <div class="wrap">
          <div class="pagehead__inner">
            <p class="eyebrow">{e(a['eyebrow'])}</p>
            <h1>{e(a['h1'])}</h1>
            <p class="lede">{e(a['lede'])}</p>
          </div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="wrap">
          <div class="split">
            <div class="split__media reveal">
              <img
                src="{asset(lang, 'about', 'img/storefront.jpg')}"
                width="654"
                height="862"
                alt="{e(a['story_alt'])}"
                loading="lazy"
              />
            </div>
            <div class="reveal" data-delay="90">
              <h2>{e(a['story_h2'])}</h2>
              <div style="margin-top: 1rem">
{story}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section band-wash">
        <div class="wrap">
          <div class="head head--center reveal">
            <p class="eyebrow">{e(a['values_head']['eyebrow'])}</p>
            <h2>{e(a['values_head']['h2'])}</h2>
          </div>
          <div class="grid grid--3">
{cards(a['values'])}
          </div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="wrap">
          <div class="split split--reverse">
            <div class="split__media split__media--wide reveal">
              <img
                src="{asset(lang, 'about', 'img/sign.jpg')}"
                width="1290"
                height="957"
                alt="{e(a['sign_alt'])}"
                loading="lazy"
              />
            </div>
            <div class="reveal" data-delay="90">
              <p class="eyebrow">{e(a['sign_eyebrow'])}</p>
              <h2>{e(a['sign_h2'])}</h2>
              <div style="margin-top: 1rem">
{sign}
              </div>
            </div>
          </div>
        </div>
      </section>"""


def contact(lang: str) -> str:
    k = COPY[lang]["contact"]
    rows = "\n".join(
        f"""                  <tr data-day="{days}"{' data-closed="true"' if isinstance(hours, dict) else ''}>
                    <th scope="row">{e(label[lang])}</th>
                    <td>{e(hours[lang]) if isinstance(hours, dict) else hours}</td>
                  </tr>"""
        for days, label, hours in HOURS_ROWS
    )

    return f"""      <section class="pagehead">
        <div class="wrap">
          <div class="pagehead__inner">
            <p class="eyebrow">{e(k['eyebrow'])}</p>
            <h1>{e(k['h1'])}</h1>
            <p class="lede">{e(k['lede'])}</p>
          </div>
        </div>
      </section>

      <!-- Details --------------------------------------------------- -->
      <section class="section section--tight">
        <div class="wrap">
          <div class="glass contact-panel reveal">
            <div class="split" style="align-items: start">
              <div>
                <ul class="info-list">
                  <li class="info-item">
                    <span class="info-item__icon">{ICONS['pin']}</span>
                    <div>
                      <h3>{e(k['address_label'])}</h3>
                      <p class="info-item__value">{e(ADDRESS[lang])}</p>
                    </div>
                  </li>
                  <li class="info-item">
                    <span class="info-item__icon">{ICONS['phone']}</span>
                    <div>
                      <h3>{e(k['phone_label'])}</h3>
                      <a class="phone-link" href="tel:{PHONE_TEL}">{e(PHONE[lang])}</a>
                    </div>
                  </li>
                </ul>
                <div class="btn-row" style="margin-top: 1.75rem">
                  <a class="btn btn--primary" href="{MAPS_LINK}" rel="noopener">{ICONS['pin']}{e(k['directions'])}</a>
                  <a class="btn btn--glass" href="tel:{PHONE_TEL}">{ICONS['phone']}{e(k['call'])}</a>
                </div>
              </div>

              <div>
                <div class="info-item">
                  <span class="info-item__icon">{ICONS['clock']}</span>
                  <div style="flex: 1">
                    <h3>{e(k['hours_label'])}</h3>
                    <p style="margin: 0.4rem 0 1rem"><span class="chip" data-open-now>{e(COPY[lang]['hero']['float2'])}</span></p>
                    <table class="hours">
                      <tbody>
{rows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- The invitation -------------------------------------------- -->
      <section class="wrap invite reveal">
        <h2>{e(k['invite_h2'])}</h2>
        <p class="lede">{e(k['invite_p'])}</p>
      </section>

      <!-- Where to find us ------------------------------------------ -->
      <section class="section section--tight">
        <div class="wrap">
          <div class="head reveal">
            <p class="eyebrow">{e(k['find_eyebrow'])}</p>
            <h2>{e(k['find_h2'])}</h2>
            <p class="lede">{e(k['find_p'])}</p>
          </div>

          <div class="glass map reveal">
            <div class="map__frame">
              <iframe
                src="{MAPS_EMBED}"
                title="{e(k['map_label'])}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <span class="map__pin">{ICONS['pin_cup']}</span>
            </div>
            <div class="map__bar">
              <span class="meta"><strong>simpli cafe</strong> · {e(ADDRESS[lang])}</span>
              <a class="btn btn--quiet" href="{MAPS_LINK}" rel="noopener">{e(k['map_cta'])} {ICONS['arrow']}</a>
            </div>
          </div>
        </div>
      </section>"""


BUILDERS = {"home": home, "about": about, "contact": contact}


def main() -> None:
    written = []
    for lang in LANGS:
        for page in PAGES:
            body = BUILDERS[page](lang)
            doc = document(lang, page, body)
            if page == "home":
                # The structured data belongs on the page Google lands on.
                doc = doc.replace("  </head>", jsonld(lang) + "\n  </head>")
            out = ROOT / path_of(lang, page) / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(doc, encoding="utf-8")
            written.append(str(out.relative_to(ROOT)))

    # Sitemap, with both languages cross-referenced.
    urls = []
    for lang in LANGS:
        for page in PAGES:
            alts = "".join(
                f'\n    <xhtml:link rel="alternate" hreflang="{alt}" href="{SITE}/{path_of(alt, page)}"/>'
                for alt in LANGS
            )
            urls.append(
                f"  <url>\n    <loc>{SITE}/{path_of(lang, page)}</loc>{alts}\n"
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{SITE}/{path_of("el", page)}"/>\n  </url>'
            )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(urls) + "\n</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    written.append("sitemap.xml")

    (ROOT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8"
    )
    written.append("robots.txt")

    print("\n".join(written))


if __name__ == "__main__":
    main()
