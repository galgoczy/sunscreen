export interface SubpageMeta {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: Array<{ h2: string; body: string }>;
  category: "activity" | "skin" | "product" | "education" | "myth";
  relatedSlugs: string[];
}

export const subpages: SubpageMeta[] = [
  {
    slug: "how-often-to-reapply-sunscreen",
    title: "How Often to Reapply Sunscreen",
    metaTitle: "How Often to Reapply Sunscreen (Real Dermatology Rule, Not the SPF Myth)",
    description:
      "Dermatologists recommend reapplying sunscreen every two hours — but UV index, activity, and skin type can shorten that window. Here's the honest rule.",
    h1: "How often should you reapply sunscreen?",
    intro:
      "The simple answer is every two hours. The honest answer is: it depends on your UV exposure, what you're doing, and how fair your skin is. SPF strength is not the deciding factor — even SPF 100 starts breaking down on your skin within hours, and rubbing, sweating, and swimming all wash it off faster. This page explains the real rule dermatologists use, and how the smart sunscreen timer applies it to your situation.",
    sections: [
      {
        h2: "The two-hour rule, explained",
        body: "Every major dermatology body — the American Academy of Dermatology, the Skin Cancer Foundation, the British Association of Dermatologists — agrees on the same baseline: reapply every two hours of sun exposure. That number isn't arbitrary. It reflects how long the chemical and mineral filters in sunscreen stay evenly distributed on your skin before sweating, rubbing against clothing, and the skin's natural oils erode coverage. After two hours, even a perfectly applied layer no longer offers reliable protection.",
      },
      {
        h2: "Why SPF doesn't multiply your reapply time",
        body: "A common myth: SPF 30 lasts 30 times longer than no sunscreen, so SPF 50 lasts almost twice as long as SPF 30. Both halves are wrong. SPF measures how much UVB radiation gets blocked at a single point in time when the product is freshly applied at a precise lab thickness (2 mg per square centimeter). It says nothing about how long the protection lasts on your real skin in real conditions. Higher SPF means a marginally smaller percentage of UV gets through — not more hours of coverage.",
      },
      {
        h2: "When two hours is too long",
        body: "Water, sweat, and friction all cut the window short. Swimming or heavy sweating? Reapply every 40 to 80 minutes depending on the product's water resistance label. At the beach or pool, reflected UV from sand and water increases your dose by up to 25%, so 100 minutes is a safer target. Under a UV index of 8 or higher, your skin reaches a burning dose faster — drop to 80 minutes. The smart sunscreen timer factors all of this in automatically when you enter your activity and UV index.",
      },
      {
        h2: "When you can stretch slightly past two hours",
        body: "Indoors near a window, on overcast days with UV index 2 or below, or under heavy tree cover, you can reasonably stretch to about three hours — but don't go further. UVA still passes through glass and clouds and contributes to skin aging and long-term cancer risk, even when you're not visibly tanning. If you're outdoors at all, set the timer.",
      },
    ],
    category: "education",
    relatedSlugs: [
      "spf-30-vs-spf-50-reapplication",
      "sunscreen-uv-index-explained",
      "sunscreen-application-amount-guide",
    ],
  },
  {
    slug: "sunscreen-while-swimming",
    title: "Sunscreen While Swimming",
    metaTitle: "Sunscreen While Swimming: How Often to Reapply (40 or 80 Minutes?)",
    description:
      "Water resistance labels mean 40 or 80 minutes — not 'waterproof.' Here's how to time sunscreen reapplication during swimming.",
    h1: "Sunscreen while swimming: the real reapply window",
    intro:
      "If you've ever wondered whether your 'water resistant' sunscreen actually survives a swim, the answer is: barely, and only for as long as the bottle says. The FDA banned the term 'waterproof' in 2011 for a reason — no sunscreen is waterproof. Here's how to time it right.",
    sections: [
      {
        h2: "What 'water resistant' actually means",
        body: "In the United States, a sunscreen label can say 'water resistant (40 minutes)' or 'water resistant (80 minutes)' — never anything longer. Those minutes are how long the product maintains its SPF rating during continuous immersion or heavy sweating, tested in a lab. After that, reapplication is mandatory. The EU and Australia use similar standards.",
      },
      {
        h2: "Reapply immediately after toweling off",
        body: "Even before the 40 or 80 minute mark expires, toweling off removes a significant portion of your sunscreen layer. The Skin Cancer Foundation recommends reapplying after every swim, regardless of how short, before going back into the sun. Pat dry instead of rubbing if you want to preserve more of the layer between sessions.",
      },
      {
        h2: "Why pool reflection makes it worse",
        body: "Water reflects roughly 10–25% of UV back at you, depending on the angle of the sun. That means even when you're on the deck, not in the pool, your skin is getting a double dose. Combine that with the chlorine and salt breaking down sunscreen filters faster, and the result is: even a stationary day at the pool needs more frequent reapplication than a hike on dry land.",
      },
      {
        h2: "Use the timer with the 'Swimming' setting",
        body: "Set the smart sunscreen timer to the Swimming activity and it will use a 60-minute baseline by default, adjusted for UV. If your bottle says 80-minute water resistance, you can manually round up slightly — but never past the next reapply alert.",
      },
    ],
    category: "activity",
    relatedSlugs: [
      "water-resistant-vs-waterproof-sunscreen",
      "sunscreen-and-sweating",
      "sunscreen-at-the-beach",
    ],
  },
  {
    slug: "spf-30-vs-spf-50-reapplication",
    title: "SPF 30 vs SPF 50 Reapplication",
    metaTitle: "SPF 30 vs SPF 50: Does Higher SPF Mean Less Reapplication?",
    description:
      "SPF 50 doesn't double your sun time. Here's the honest difference between SPF 30 and SPF 50 — and why both still need reapplying every two hours.",
    h1: "SPF 30 vs SPF 50: does higher SPF mean less reapplication?",
    intro:
      "Short answer: no. Higher SPF doesn't buy you more time before reapplying. It buys you a slightly higher percentage of UVB blocked at any given moment — and only when the product is applied at the right thickness and not yet rubbed off.",
    sections: [
      {
        h2: "What SPF actually measures",
        body: "SPF stands for Sun Protection Factor and is measured against UVB radiation, the part of the spectrum that causes sunburn. SPF 30 blocks about 97% of UVB. SPF 50 blocks about 98%. The difference is real, but small — and only at the moment the product is fresh on your skin at a precise lab thickness (2 mg per square centimeter, far more than most people actually use).",
      },
      {
        h2: "Why both need reapplying at the same intervals",
        body: "Both SPF 30 and SPF 50 break down at the same rate under UV exposure. Both get rubbed off by clothing, towels, and sweat at the same rate. Both wash off in water at the same rate, governed by the water resistance label rather than the SPF number. So the reapply window is the same for both: every two hours of sun exposure, sooner for swimming, sweating, or extreme UV.",
      },
      {
        h2: "When higher SPF is worth it anyway",
        body: "Most people apply far less sunscreen than the lab-tested amount. If you're applying half the recommended amount (which is typical), SPF 50 effectively becomes about SPF 7 — better than SPF 30 becoming SPF 4. So higher SPF can serve as a buffer against your own under-application. It doesn't extend the time window, but it raises the floor on a given moment's protection.",
      },
      {
        h2: "Use the timer regardless of SPF",
        body: "The smart sunscreen timer doesn't ask for SPF as a multiplier on time — that would perpetuate the myth. It asks for SPF as context for the recommendation, but the reapply window is driven by your activity, UV index, and skin type. Reapply on time. Every time.",
      },
    ],
    category: "myth",
    relatedSlugs: [
      "how-often-to-reapply-sunscreen",
      "sunscreen-application-amount-guide",
      "sunscreen-uv-index-explained",
    ],
  },
  {
    slug: "sunscreen-for-kids-timing",
    title: "Sunscreen for Kids: Timing",
    metaTitle: "Sunscreen for Kids: How Often to Reapply for Children and Babies",
    description:
      "Kids' skin burns faster. Here's the reapply schedule for children, plus what to do for babies under six months.",
    h1: "Sunscreen for kids: how often to reapply",
    intro:
      "Children's skin is thinner and more susceptible to UV damage than adult skin. A single bad sunburn in childhood roughly doubles the lifetime risk of melanoma. That makes the reapply schedule for kids stricter, not looser.",
    sections: [
      {
        h2: "The 90-minute rule for active children",
        body: "For kids running around outdoors — at the park, the pool, the beach — drop the standard two-hour interval to 90 minutes. Children sweat more relative to body size, rub their faces and arms more often, and rarely apply enough product to start. Reapplying every 90 minutes builds in a safety margin that compensates for all of those factors.",
      },
      {
        h2: "Babies under six months: avoid sunscreen, avoid sun",
        body: "Pediatricians broadly agree that babies under six months should not wear chemical sunscreen — their skin absorbs ingredients more readily, and the safety data isn't there. Instead: keep them out of direct sun entirely. Hat, lightweight long sleeves, stroller canopy. Mineral sunscreen (zinc oxide) on small exposed areas like the back of the hands is generally considered acceptable when shade isn't possible.",
      },
      {
        h2: "Best sunscreen choices for kids",
        body: "Mineral (zinc oxide, titanium dioxide) sunscreens are usually recommended for children — they sit on top of the skin instead of being absorbed, and they're less likely to irritate eyes if sweat carries them down. Look for 'broad spectrum' (covers UVA and UVB) and water resistance of at least 80 minutes for pool and beach days.",
      },
      {
        h2: "Make the timer the bedtime story",
        body: "Set the smart sunscreen timer when sunscreen goes on, and let the alert do the parenting nag. Kids who get a buzz on a phone tend to listen better than kids who get told 'time to reapply' for the fourth time in an hour.",
      },
    ],
    category: "skin",
    relatedSlugs: [
      "sunscreen-fitzpatrick-skin-type-guide",
      "sunscreen-at-the-beach",
      "how-often-to-reapply-sunscreen",
    ],
  },
  {
    slug: "sunscreen-fitzpatrick-skin-type-guide",
    title: "Fitzpatrick Skin Type Guide",
    metaTitle: "Fitzpatrick Skin Type Guide: Find Your Type and Sunscreen Schedule",
    description:
      "The Fitzpatrick scale classifies skin from Type I (very fair, always burns) to Type VI (deeply pigmented, never burns). Find your type and your sunscreen needs.",
    h1: "Fitzpatrick skin type guide for sunscreen timing",
    intro:
      "The Fitzpatrick scale is the dermatology standard for categorizing how skin responds to UV. It runs from I to VI, with Type I being the fairest and Type VI the deepest pigmented. Knowing your type sharpens every UV-related decision: SPF strength, reapply schedule, and how much sun is safe in the first place.",
    sections: [
      {
        h2: "The six types in one paragraph each",
        body: "Type I: very pale, often with red or strawberry-blonde hair and freckles. Always burns, never tans. Highest UV risk. Type II: fair-skinned with blue, green, or hazel eyes. Usually burns, sometimes lightly tans. Type III: medium-toned, may have darker hair and eyes, tans gradually but can still burn. Type IV: olive or light brown skin, rarely burns, tans easily. Type V: medium brown skin, very rarely burns, tans deeply. Type VI: deeply pigmented skin, almost never burns visibly — but melanoma still occurs, often diagnosed later because it's less expected.",
      },
      {
        h2: "Why skin type changes the reapply window",
        body: "Type I and II skin reaches a burning dose of UV faster — sometimes in 15 to 25 minutes under a strong sun, before any sunscreen would normally need its first reapply. For these types, the smart sunscreen timer adds an extra 15% urgency to the schedule. Types III through VI use the dermatologist standard two-hour baseline because their natural pigmentation extends safe exposure time, but the reapply rule itself stays the same — protection wears off at the same rate regardless of skin tone.",
      },
      {
        h2: "Don't skip sunscreen if you're Type V or VI",
        body: "A persistent myth: darker skin doesn't need sunscreen. False. Melanin offers roughly the equivalent of SPF 13 protection at the high end — useful, but not enough for prolonged exposure. UVA still causes premature aging across all skin types. And skin cancer in deeply pigmented skin is often diagnosed later and at more advanced stages, making it more dangerous. Wear sunscreen.",
      },
      {
        h2: "Set your type in the timer once",
        body: "On the smart sunscreen timer, pick your Fitzpatrick type from the dropdown. The calculation adjusts automatically. You only have to set it once per device.",
      },
    ],
    category: "skin",
    relatedSlugs: [
      "sunscreen-for-kids-timing",
      "sunscreen-uv-index-explained",
      "how-often-to-reapply-sunscreen",
    ],
  },
  {
    slug: "reapply-sunscreen-on-makeup",
    title: "Reapply Sunscreen on Makeup",
    metaTitle: "How to Reapply Sunscreen Over Makeup Without Ruining It",
    description:
      "Powders, mists, and sticks all work. Here's how to reapply sunscreen over makeup without smearing or pilling.",
    h1: "How to reapply sunscreen over makeup",
    intro:
      "The reapply problem for anyone wearing makeup: you can't slap a creamy SPF over a finished face without smearing your foundation. Fortunately, the cosmetic industry has built three legitimate solutions — none of them is 'just skip reapplying.'",
    sections: [
      {
        h2: "Powder sunscreen: the easiest reapply",
        body: "Mineral powder sunscreens with SPF 30 or higher are the most makeup-compatible option. They come in a brush applicator and dust on top of foundation without disturbing it. They're typically zinc oxide or titanium dioxide. Reliable brands include Colorescience, Brush On Block, and Supergoop (re)setting Powder. Sweep generously — most people under-apply powder SPF dramatically.",
      },
      {
        h2: "Setting sprays with SPF",
        body: "A growing category. SPF mists with at least SPF 30 spray on like a setting spray and dry in seconds. The trick is to hold the bottle far enough away to get even coverage, and to use enough product — a single spritz isn't enough. The product needs to actually wet the skin, not just feather over it.",
      },
      {
        h2: "Sunscreen sticks: portable and precise",
        body: "Stick sunscreens are ideal for the face when you want to target specific areas — nose, cheekbones, forehead — without touching the rest of your makeup. Glide on, then press gently with a clean finger or sponge to blend the edges. Brands like Supergoop, Shiseido, and Coola all make decent sticks. Avoid greasy formulas if you wear powder foundation, since they can cause pilling.",
      },
      {
        h2: "Set the timer; pick your method later",
        body: "Open the smart sunscreen timer when you apply morning SPF under your makeup. When the alert hits, use whichever method fits your day — powder for the office, mist for the patio, stick for hands and ears. Skipping reapplication because of makeup is the most common UV mistake among adults — don't be that person.",
      },
    ],
    category: "product",
    relatedSlugs: [
      "how-often-to-reapply-sunscreen",
      "sunscreen-application-amount-guide",
      "sunscreen-and-sweating",
    ],
  },
  {
    slug: "sunscreen-uv-index-explained",
    title: "UV Index Explained",
    metaTitle: "UV Index Explained: What the Numbers Mean for Sunscreen Timing",
    description:
      "From 0 to 11+, the UV index tells you how fast skin can burn. Here's how to read it and what each level means for sunscreen.",
    h1: "UV index explained — and what it means for sunscreen",
    intro:
      "The UV index is the World Health Organization's standard scale for how intense the sun's ultraviolet radiation is at a given place and time. It's a small number with big consequences for sunscreen timing.",
    sections: [
      {
        h2: "The scale, level by level",
        body: "UV 0–2 is Low. UV 3–5 is Moderate. UV 6–7 is High. UV 8–10 is Very High. UV 11 and above is Extreme. The smart sunscreen timer reads your live UV index from currentuvindex.com and shortens the reapply window automatically as the number climbs. Under UV 8, fair skin can reach a burning dose in under 25 minutes.",
      },
      {
        h2: "What drives the UV index up",
        body: "Latitude (closer to the equator = higher), elevation (higher altitude = thinner atmosphere = more UV), time of day (10 a.m. to 4 p.m. is peak), season (summer in your hemisphere), cloud cover (light clouds barely reduce UV, heavy clouds can), and surface reflection (snow, sand, and water all amplify exposure). A cloudy ski day at altitude can deliver more UV than a sunny day at sea level.",
      },
      {
        h2: "How to use the live UV reading on this site",
        body: "When you allow location access, the smart sunscreen timer fetches the current UV index for your exact coordinates and updates the calculation. You'll see the bucket (Low, Moderate, High, Very High, Extreme) right under the input. If you'd rather not share location, you can type the UV index manually — most weather apps and the iPhone weather widget show it.",
      },
      {
        h2: "When the UV index lies to you",
        body: "UV index reports the highest expected level for the day, not the level at this exact minute. In early morning or late afternoon, the actual UV is much lower than the headline number. The smart timer uses the live point-in-time value from currentuvindex.com, so it's more accurate than what's on the morning forecast — but always trust visible signs (skin tingling, redness) over any number.",
      },
    ],
    category: "education",
    relatedSlugs: [
      "cloudy-day-sunscreen",
      "how-often-to-reapply-sunscreen",
      "sunscreen-at-the-beach",
    ],
  },
  {
    slug: "sunscreen-at-the-beach",
    title: "Sunscreen at the Beach",
    metaTitle: "Sunscreen at the Beach: Reapply Schedule, Best SPF, and Reflected UV",
    description:
      "A beach day delivers up to 25% more UV than open ground. Here's the right reapply schedule, sand and water reflection facts, and product picks.",
    h1: "Sunscreen at the beach: the right reapply schedule",
    intro:
      "The beach is one of the highest-risk environments for sunburn. Reflected UV from sand and water, combined with long unshaded hours, can deliver a dangerous cumulative dose. Get the timing right and you can spend a full day outside safely.",
    sections: [
      {
        h2: "Sand and water reflect more UV than you think",
        body: "Dry sand reflects roughly 15–25% of UV, water around 10%, and white surfaces (towels, sand chairs, sailcloth) up to 30%. That means even under an umbrella, you're getting a significant dose from underneath and the sides. Sit further from the water line if you can, and don't assume an umbrella is a substitute for sunscreen.",
      },
      {
        h2: "The 100-minute reapply window",
        body: "Set the smart sunscreen timer to the Beach or pool deck activity. With moderate UV (5–7), it defaults to a 100-minute window. With UV 8 or higher — common in summer, near the equator, or at midday — it tightens to 80 minutes. Don't try to stretch this. Reflected UV makes the beach effectively a higher-exposure environment than your shoulder's-eye view of the sun suggests.",
      },
      {
        h2: "Best product types for beach days",
        body: "Pick a water resistant (80-minute) broad spectrum sunscreen of SPF 50 or higher. Cream formulas tend to apply more evenly than sprays. If you use a spray, also rub it in by hand — the wind blows half of it away otherwise. Bring a stick or powder for face touch-ups; you'll want to reapply on the face more often than your bottle dispenses easily.",
      },
      {
        h2: "Tide of small habits",
        body: "Reapply after every swim. Reapply after toweling off, even from sweat. Reapply 15 minutes before the timer goes off if you're about to swim. And finish the day with a cool shower and aloe — even a perfect day at the beach leaves the skin mildly inflamed.",
      },
    ],
    category: "activity",
    relatedSlugs: [
      "sunscreen-while-swimming",
      "sunscreen-and-sweating",
      "sunscreen-uv-index-explained",
    ],
  },
  {
    slug: "sunscreen-while-hiking",
    title: "Sunscreen While Hiking",
    metaTitle: "Sunscreen While Hiking: Altitude, Sweat, and Reapply Timing",
    description:
      "Elevation increases UV exposure by about 4% per 300 meters. Here's how to time sunscreen on a hike, and what to pack.",
    h1: "Sunscreen while hiking: altitude and sweat change the math",
    intro:
      "A hike isn't a walk in a flat park. As you climb, the thinner atmosphere lets more UV through. Combine that with sweat, wind drying out your skin, and shifting tree cover — and the reapply schedule needs to keep up.",
    sections: [
      {
        h2: "The altitude effect",
        body: "UV intensity increases by roughly 4% for every 300 meters (1,000 feet) of elevation gain. A summit at 3,000 meters delivers about 40% more UV than the trailhead at sea level. Even modest hills add up — by 1,500 meters you've gained 20% in UV exposure without realizing it.",
      },
      {
        h2: "Sweat shortens the window",
        body: "Heavy sweating cuts the reapply window to 80 minutes regardless of altitude. Combine altitude and sweat, and the smart sunscreen timer trims further when UV climbs into the 8+ range — often as low as 60 minutes near a summit on a clear day.",
      },
      {
        h2: "Pack for reapplication, not just protection",
        body: "Carry a stick or compact tube of broad-spectrum SPF 50 in an outside pocket or hip belt — not buried in the pack. The easier it is to grab, the more likely you'll actually use it. Reapply at every rest stop. Add a wide-brimmed hat and UV-blocking sleeves to cut the reapply burden, especially on long ridge sections without shade.",
      },
      {
        h2: "Set the timer when you start the trail",
        body: "Pick the Sports or sweating activity on the smart sunscreen timer when you start hiking. Let the alert prompt you at rest stops. If you don't have signal at the trailhead, the timer runs offline — fetch your UV index before you leave town if you can.",
      },
    ],
    category: "activity",
    relatedSlugs: [
      "sunscreen-and-sweating",
      "sunscreen-uv-index-explained",
      "how-often-to-reapply-sunscreen",
    ],
  },
  {
    slug: "cloudy-day-sunscreen",
    title: "Cloudy Day Sunscreen",
    metaTitle: "Do You Need Sunscreen on a Cloudy Day? (Short Answer: Yes)",
    description:
      "Up to 80% of UV passes through clouds. Here's why cloudy-day sunscreen is non-negotiable, and how to time reapplication.",
    h1: "Do you need sunscreen on a cloudy day?",
    intro:
      "The fastest sunburns of the year happen on overcast days. People look up, see grey, and skip the sunscreen — while ultraviolet light blasts right through the cloud layer onto unprotected skin.",
    sections: [
      {
        h2: "Clouds barely block UV",
        body: "Light cloud cover blocks only about 10% of UV. Thick cloud cover blocks around 50%. Even a fully overcast sky still lets 30 to 80 percent of UV through, depending on the cloud type. Cumulonimbus storm clouds offer the most shielding; high cirrus clouds offer almost none.",
      },
      {
        h2: "Why the UV index doesn't drop as much as it feels",
        body: "On a cloudy June day, the UV index might read 6 or 7 even though the sky looks dim. That's still High territory. The smart sunscreen timer pulls the live UV value rather than guessing from cloud cover, which is why your reapply window can come up shorter than the dim sky suggests.",
      },
      {
        h2: "The 'edge of the cloud' effect",
        body: "When the sun briefly breaks through a gap in the clouds, UV can actually spike higher than on a clear day — clouds at the edges of the gap reflect UV back down. Photographers know this as 'broken cloud' light. Skiers and sailors get burned this way constantly.",
      },
      {
        h2: "Don't downgrade the timer for clouds",
        body: "Keep the activity setting honest — Light outdoor or Beach, whatever you're actually doing. The UV multiplier will adjust based on the real measured UV, not the visual sky. Cloudy days are when most adults make their worst sunscreen decisions; don't be one of them.",
      },
    ],
    category: "myth",
    relatedSlugs: [
      "sunscreen-uv-index-explained",
      "how-often-to-reapply-sunscreen",
      "sunscreen-while-hiking",
    ],
  },
  {
    slug: "sunscreen-and-sweating",
    title: "Sunscreen and Sweating",
    metaTitle: "Sunscreen and Sweating: How to Reapply for Sports and Workouts",
    description:
      "Heavy sweating washes off sunscreen in under 90 minutes. Here's the reapply schedule for outdoor sports and workouts.",
    h1: "Sunscreen and sweating: the right reapply schedule",
    intro:
      "Sweat is sunscreen's quiet enemy. Even products labeled 'sweat resistant' don't last as long as their bottles suggest under real workout conditions.",
    sections: [
      {
        h2: "Why sweat removes sunscreen faster than water",
        body: "Sweat carries salt, oils, and surfactant-like proteins that break the bond between sunscreen and skin more aggressively than plain water. A 30-minute run in 30°C heat can strip away a third of your applied protection — and rubbing your face with a sleeve or towel does the rest.",
      },
      {
        h2: "The 80-minute rule for active outdoor sport",
        body: "For tennis, running, cycling, soccer, golf, or any heavy-sweat activity in direct sun, set the smart sunscreen timer to Sports or sweating. It uses an 80-minute baseline, tightening to 60 minutes when UV climbs above 8. Reapply at every break — change of ends, half-time, water stop.",
      },
      {
        h2: "Sport-specific product picks",
        body: "Stick sunscreens grip better on a sweaty face than lotions. Mineral sunscreens with zinc oxide tend to bead off slower than chemical filters under heavy sweat. Avoid spray-only application for sports — the layer is too thin to start with. Some 'sport' formulations include extra emulsifiers to help the product survive sweat; look for SPF 50, broad spectrum, water resistant (80 minutes).",
      },
      {
        h2: "Cool down, then reapply, then go again",
        body: "Don't try to layer fresh sunscreen onto a sweat-soaked face during a workout. Wipe down, rest a minute, then apply. The product needs a relatively dry surface to bond. The smart timer will tell you when; the right technique tells you how.",
      },
    ],
    category: "activity",
    relatedSlugs: [
      "sunscreen-while-hiking",
      "sunscreen-while-swimming",
      "how-often-to-reapply-sunscreen",
    ],
  },
  {
    slug: "sunscreen-for-tattoos",
    title: "Sunscreen for Tattoos",
    metaTitle: "Sunscreen for Tattoos: Protecting New and Old Ink From Fading",
    description:
      "UV fades tattoo ink fast. Here's how to protect new tattoos (don't) and old tattoos (yes, every two hours).",
    h1: "Sunscreen for tattoos: protect new and old ink",
    intro:
      "Sunlight is the single biggest cause of tattoo fading. Black ink turns greenish, color ink turns muddy, and crisp lines blur. Sunscreen is the cheapest insurance for keeping ink sharp.",
    sections: [
      {
        h2: "Brand-new tattoos: no sunscreen, no sun",
        body: "While a tattoo is healing — typically the first two to four weeks — do not apply sunscreen to it. The chemical filters can interfere with the healing skin, and the area is too sensitive for the rubbing motion. Keep new tattoos completely out of direct sun. Cover with loose clothing if you have to be outside. Tattoo artists are unanimous on this.",
      },
      {
        h2: "Once healed: SPF 30 minimum, every two hours",
        body: "After full healing, the tattoo skin is permanent — but the ink underneath is still vulnerable to UV. Apply a broad-spectrum SPF 30 or higher every time the tattoo is exposed to sun, and reapply every two hours just like the rest of your skin. Mineral (zinc) sunscreens tend to be gentler for tattooed skin and don't sting if you have any lingering sensitivity.",
      },
      {
        h2: "Why color tattoos fade faster",
        body: "Yellow, red, and orange pigments are the most UV-sensitive. Black is the most durable but still fades over years. White ink fades fastest of all. A tattoo on a forearm or shoulder that gets daily sun without sunscreen will fade noticeably within five years; the same tattoo on a covered area can stay crisp for decades.",
      },
      {
        h2: "Year-round, not just summer",
        body: "Winter sun still hits your hands and face. UV exposure accumulates. Daily moisturizer with SPF 30 on visible tattoos is the easiest habit. The smart sunscreen timer is for the longer outdoor days — but consistency every day matters more than any single application.",
      },
    ],
    category: "product",
    relatedSlugs: [
      "sunscreen-application-amount-guide",
      "how-often-to-reapply-sunscreen",
      "sunscreen-expiration-guide",
    ],
  },
  {
    slug: "sunscreen-expiration-guide",
    title: "Sunscreen Expiration Guide",
    metaTitle: "Does Sunscreen Expire? Shelf Life, Storage, and When to Toss",
    description:
      "Sunscreen expires. Heat speeds it up. Here's how to read the date, store it right, and tell when a bottle is past its prime.",
    h1: "Sunscreen expiration: when to toss the bottle",
    intro:
      "An expired sunscreen is worse than no sunscreen, because it convinces you you're protected when you're not. Read the date, store smart, and replace bottles every season.",
    sections: [
      {
        h2: "Three years from manufacture",
        body: "The FDA requires sunscreens to maintain their stated SPF for three years from the date of manufacture. If a bottle doesn't have a printed expiration date, write the purchase date on it with a marker and toss it three years later — or sooner if it lived in a hot car or beach bag.",
      },
      {
        h2: "Heat is the enemy",
        body: "Sunscreen stored above 25°C (77°F) degrades much faster. Cars in summer, beach bags in direct sun, and shower windowsills are all bad storage spots. Cool, dark, and dry — bathroom cabinet, hallway closet, fridge if you live somewhere very hot. If your bottle has been in a car all summer, replace it.",
      },
      {
        h2: "Signs of a bad bottle",
        body: "Separation (oily liquid pooling on top, thick paste on the bottom — even after shaking). Color change (yellowing, greyish tint). Smell change (rancid, sour, or chemical). Watery consistency where it used to be creamy. Any of these means the formula has broken down and the SPF rating no longer applies. Toss it.",
      },
      {
        h2: "Buy small, replace often",
        body: "A travel-size tube you actually finish in one summer is more reliable than a year-old family bottle. The smart sunscreen timer can't save you from expired product — but matching your bottle size to your use rate can.",
      },
    ],
    category: "product",
    relatedSlugs: [
      "sunscreen-application-amount-guide",
      "sunscreen-for-tattoos",
      "water-resistant-vs-waterproof-sunscreen",
    ],
  },
  {
    slug: "water-resistant-vs-waterproof-sunscreen",
    title: "Water Resistant vs Waterproof Sunscreen",
    metaTitle: "Water Resistant vs Waterproof Sunscreen: The Label Truth",
    description:
      "No sunscreen is waterproof — that label was banned in 2011. Here's what 'water resistant 40 / 80 minutes' actually means.",
    h1: "Water resistant vs waterproof sunscreen: the label truth",
    intro:
      "If a bottle calls itself waterproof, it's either illegal in the US or imported from a country with looser labeling. Here's what the legitimate labels mean — and how to use them in real life.",
    sections: [
      {
        h2: "Why 'waterproof' was banned",
        body: "In 2011, the FDA banned the words 'waterproof' and 'sweatproof' on US sunscreen labels because no sunscreen actually achieves either. Studies showed users were dramatically over-extending their reapply intervals based on those claims. The replacement: 'water resistant (40 minutes)' or 'water resistant (80 minutes)' — measured by SPF retention during continuous immersion in a lab.",
      },
      {
        h2: "What 40 and 80 minute claims actually test",
        body: "The 40-minute test: subjects swim for 20 minutes, rest 20, swim 20 — and the SPF must still be within rating tolerance afterward. The 80-minute test extends that to four 20-minute cycles. Towel drying is not part of the test. Heavy sweating is partially covered but less rigorous than swimming. So always reapply after toweling off, even within the claimed window.",
      },
      {
        h2: "Australian and EU equivalents",
        body: "Australia uses 'water resistant 4 hours' as the top tier (much stricter testing than the US). EU labels often just say 'water resistant' without a number. As a rule of thumb, if you're outside the US, treat 'water resistant' as roughly equivalent to 40-minute US claims unless the label specifies otherwise.",
      },
      {
        h2: "Use the timer, ignore the marketing",
        body: "Set the smart sunscreen timer to Swimming and trust the alert. The water resistance number tells you when the bottle's claim runs out — the timer tells you when to reapply, and it's stricter than the bottle. That gap is intentional. Better to reapply slightly early than to find out a label overpromised.",
      },
    ],
    category: "myth",
    relatedSlugs: [
      "sunscreen-while-swimming",
      "sunscreen-expiration-guide",
      "how-often-to-reapply-sunscreen",
    ],
  },
  {
    slug: "sunscreen-application-amount-guide",
    title: "Sunscreen Application Amount Guide",
    metaTitle: "How Much Sunscreen to Use: The Real Amount (Most People Apply Half)",
    description:
      "The lab-tested amount is 2 mg per square centimeter — roughly a shot glass for the whole body. Most people apply half. Here's how to fix that.",
    h1: "How much sunscreen to use: the real amount",
    intro:
      "The single biggest gap between sunscreen science and real-world results: under-application. A bottle that promises SPF 50 only delivers it if you apply the lab-tested thickness. Most people apply roughly half that — which can drop effective SPF by 75%.",
    sections: [
      {
        h2: "The shot glass rule",
        body: "For the whole body in a swimsuit, the recommended amount is about one ounce (a shot glass) per application. For the face alone, two finger-lengths — squeeze sunscreen along the entire length of your index and middle fingers and use that for your face and neck combined. If your bottle is lasting an entire summer for one adult, you're under-applying.",
      },
      {
        h2: "Why under-application drops SPF fast",
        body: "SPF doesn't scale linearly with thickness. Applying half the recommended amount doesn't give you half the SPF — research suggests it gives you roughly the square root of the rated SPF. So SPF 50 applied at half thickness behaves like SPF 7. That's why higher-SPF products give a buffer against your own habits.",
      },
      {
        h2: "Common missed spots",
        body: "The ears (especially the tops). The back of the neck. The tops of the feet. The hairline. The lips (use a lip balm with SPF — regular sunscreen tastes terrible and gets eaten). Hands, especially for tattoos. Most people who get an asymmetric burn missed one of these by reflex.",
      },
      {
        h2: "Reapply the same amount, every time",
        body: "When the smart sunscreen timer alerts, don't just dab a token amount. Reapply the full shot-glass quantity (or two-finger amount for face). The alert is calibrated to a full reapplication, not a touch-up. Touch-ups are extra, not a replacement.",
      },
    ],
    category: "education",
    relatedSlugs: [
      "spf-30-vs-spf-50-reapplication",
      "how-often-to-reapply-sunscreen",
      "reapply-sunscreen-on-makeup",
    ],
  },
];

export function getSubpage(slug: string): SubpageMeta | undefined {
  return subpages.find((p) => p.slug === slug);
}

export function getRelated(slug: string): SubpageMeta[] {
  const page = getSubpage(slug);
  if (!page) return [];
  return page.relatedSlugs
    .map((s) => getSubpage(s))
    .filter((p): p is SubpageMeta => Boolean(p));
}
