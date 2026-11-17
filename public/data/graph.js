// All content lives here. Edit this file to add chapters.
// Keep the "window.GRAPH_DATA = " wrapper and the final semicolon.
window.GRAPH_DATA = {
  "meta": {
    "title": "Katha",
    "subtitle": "Hindu texts, connected. A graph of the stories from the books I am reading, in the order they are told. So far: 3 chapters.",
    "credit": "Notes based on Mahagatha by Satyarth Nayak (HarperCollins). Summaries are in my own words. Page numbers refer to the book; an asterisk means the number is inferred. Chapters 1-3 so far.",
    "source": "Mahagatha (Nayak)",
    "showSources": false
  },
  "groups": [
    {
      "id": "cosmic",
      "label": "Cosmic evolution",
      "sub": "Om to Prakriti, 5 steps",
      "type": "concept",
      "what": "The chain by which will turns into sound, then into matter, and finally into visible nature. Tap to unfold the five steps."
    }
  ],
  "nodes": [
    {
      "id": "para",
      "no": 1,
      "label": "Parabrahman",
      "type": "concept",
      "chapter": 1,
      "sub": "formless source of all",
      "what": "A supreme reality with neither start nor finish, beyond thought and the senses, and the source of everything that follows (p.2*).",
      "origin": "Not created. In the book it simply is, and it begins the universe by an act of will.",
      "why": "Every other deity is presented as a form of it, which sets this book's order of the gods. Shaiva and Vaishnava Puranas each put their own god in this slot. [Likely]",
      "also": [],
      "parallel": {
        "tag": "Guessing",
        "text": "Closest physics idea is a state before space and time. Physics has no confirmed account of any before, so this stays philosophical."
      }
    },
    {
      "id": "om",
      "no": 2,
      "label": "Om",
      "type": "concept",
      "chapter": 1,
      "sub": "first sound",
      "what": "The first sound. The book says every later sound is contained in it (p.2*).",
      "origin": "Produced by the Parabrahman's will, before any matter existed.",
      "why": "Marks the step from unmanifest to manifest: sound comes first, matter after. In wider Hindu thought, Om stands for Brahman itself. [Likely]",
      "also": [],
      "parallel": {
        "tag": "Guessing",
        "text": "Early-universe sound waves (baryon acoustic oscillations) are real and measurable. Linking them to Om is a poetic parallel; the book makes no such claim."
      },
      "group": "cosmic"
    },
    {
      "id": "mt",
      "no": 3,
      "label": "Maha Tattva",
      "type": "concept",
      "chapter": 1,
      "sub": "primordial element",
      "what": "Mahat, the great principle: the earliest manifest principle in the book's sequence, and its stated source for the three gunas (p.2*).",
      "origin": "Appears right after Om, from the Parabrahman's will. In Samkhya philosophy, Mahat is the first product of Prakriti, arising when the balance of the gunas is disturbed. [Certain]",
      "why": "Everything after it hangs from it: gunas, elements, senses. In Samkhya it is also buddhi, cosmic intelligence, from which ego, mind, senses and elements unfold. [Certain] Variant: Samkhya has the gunas inside Prakriti before Mahat, while the book derives them from Mahat. [Likely]",
      "also": [
        {
          "tag": "Certain",
          "text": "Mahat as the first product of Prakriti is Samkhya philosophy, and appears in the Bhagavata Purana canto 3."
        }
      ],
      "parallel": null,
      "group": "cosmic"
    },
    {
      "id": "gunas",
      "no": 4,
      "label": "Three gunas",
      "type": "concept",
      "chapter": 1,
      "sub": "preserve, act, destroy",
      "what": "Sattva, rajas and tamas: three strands of nature, tied in the book to preserving, acting and ending (p.2*).",
      "origin": "Derived from Maha Tattva in this telling.",
      "why": "They link philosophy to the gods' jobs: Vishnu with sattva, Brahma with rajas, Shiva with tamas. Their interplay also yields the five elements.",
      "also": [
        {
          "tag": "Likely",
          "text": "Mahat and the gunas follow Samkhya cosmology, told in Vishnu Purana 1.2 and Bhagavata canto 3."
        }
      ],
      "parallel": {
        "tag": "Certain",
        "text": "No physics counterpart. The gunas come from Samkhya philosophy: categories of quality, not forces."
      },
      "group": "cosmic"
    },
    {
      "id": "pt",
      "no": 5,
      "label": "5 elements",
      "type": "concept",
      "chapter": 1,
      "sub": "air water earth fire ether",
      "what": "The five physical elements: air, water, earth, fire and ether (p.2*).",
      "origin": "Produced when the three gunas interact.",
      "why": "The raw material of the physical world. Five of the eleven body sites Brahma gives the Rudras are these elements (p.12).",
      "also": [],
      "parallel": {
        "tag": "Guessing",
        "text": "A popular mapping reads earth, water, fire, air, ether as solid, liquid, plasma, gas and space. That is a modern gloss, not in the text."
      },
      "group": "cosmic"
    },
    {
      "id": "prak",
      "no": 6,
      "label": "Prakriti",
      "type": "concept",
      "chapter": 1,
      "sub": "nature, manifest",
      "what": "Nature taking visible form. Perception arises alongside it: five senses, with organs ruled by the mind (p.3).",
      "origin": "Appears as the elements come together (my reading of the word together on p.3). [Guessing]",
      "why": "From here the universe becomes observable. In Samkhya, Prakriti is the root of all matter. [Likely]",
      "also": [],
      "parallel": null,
      "group": "cosmic"
    },
    {
      "id": "waters",
      "no": 7,
      "label": "Waters",
      "type": "place",
      "chapter": 1,
      "sub": "primeval ocean",
      "what": "An endless primordial sea: the first setting in which anything appears (p.3).",
      "origin": "Spreads as matter forms, right after the senses arise.",
      "why": "Gives Narayana his name and receives the seed that becomes the egg. It also frames the fight in chapter 2, since Vishnu wins by finding a spot with no water (p.7).",
      "also": [],
      "parallel": null
    },
    {
      "id": "nar",
      "no": 8,
      "label": "Narayana",
      "type": "deity",
      "chapter": 1,
      "sub": "Parabrahman on the waters",
      "what": "The Parabrahman taking its first personal shape, resting on the waters (p.3).",
      "origin": "Manifested by the Parabrahman. The name comes from nara (water) and ayana (dwelling place).",
      "why": "The origin point for Vishnu. Brahma still calls Vishnu Narayana in chapter 2 (p.7). Here Narayana enters the egg as Vishnu in a separate step, while Vaishnava texts treat them as one being. [Likely]",
      "also": [
        {
          "tag": "Certain",
          "text": "Same etymology (water as nara, resting place as ayana) appears in the Manusmriti and the Harivamsa. Neither is a Purana."
        },
        {
          "tag": "Likely",
          "text": "The Vishnu Purana tells it too."
        }
      ],
      "parallel": null
    },
    {
      "id": "egg",
      "no": 9,
      "label": "Golden egg",
      "type": "place",
      "chapter": 1,
      "sub": "the cosmos (Brahmanda)",
      "what": "A golden egg that holds the cosmos in embryo, called Brahmanda. Hiranyagarbha means golden womb (p.3).",
      "origin": "The Parabrahman places its seed in the waters, which nurture it into an egg.",
      "why": "The container of everything: Vishnu enters it, Brahma is born in it, and Brahma splits it into heaven and earth. Everything created later was already latent inside it (p.9).",
      "also": [
        {
          "tag": "Certain",
          "text": "Golden egg: Rigveda 10.121 and Manusmriti 1.9, neither a Purana. In the Vishnu Purana, Vishnu is inside the egg and takes Brahma's form there."
        },
        {
          "tag": "Likely",
          "text": "Vayu, Bhagavata and Brahmanda Puranas also describe the cosmic egg."
        }
      ],
      "parallel": {
        "tag": "Guessing",
        "text": "Cosmic eggs appear in many cultures. Lemaitre's 1931 primeval atom is often compared to one. The book describes the egg's appearance as a sudden burst (p.3)."
      }
    },
    {
      "id": "vish",
      "no": 10,
      "label": "Vishnu",
      "type": "deity",
      "chapter": 1,
      "sub": "Preserver, Sattva",
      "what": "Preserver of the cosmos, who presides over sattva. Also called Madhusudan after killing Madhu (p.3, 7).",
      "origin": "Narayana enters the egg as Vishnu. His home, Vaikuntha, sits above the three realms (p.9).",
      "why": "Protects creation: Brahma turns to him against Madhu and Kaitabha, and he saves it (ch. 2).",
      "also": [
        {
          "tag": "Certain",
          "text": "Vishnu Purana: Vishnu is the source and takes Brahma's form to create and Shiva's to destroy. Mahagatha has all three emerge from the Parabrahman instead."
        }
      ],
      "parallel": null
    },
    {
      "id": "brah",
      "no": 11,
      "label": "Brahma",
      "type": "deity",
      "chapter": 1,
      "sub": "Creator, Rajas",
      "what": "The Creator, who presides over rajas. Other names: Padmayoni, Nabhija, Param Pita (p.3, 10).",
      "origin": "Born from a fourteen-petal lotus growing from Vishnu's navel.",
      "why": "The protagonist of chapters 1-3. He splits the egg, builds the world and meets four troubles. He is aware from the start of the full cycle he is setting going, including its end. On page 12 he accepts that the work of creating falls to him alone.",
      "also": [
        {
          "tag": "Likely",
          "text": "A lotus-born Brahma is the Bhagavata Purana's account (canto 3). The Vishnu Purana has him inside the egg instead."
        }
      ],
      "parallel": {
        "tag": "Likely",
        "text": "Create, preserve, dissolve, repeat echoes cyclic cosmologies (bounce, oscillating universe). Current data favor endless expansion, so no recollapse is expected."
      }
    },
    {
      "id": "vedas",
      "no": 12,
      "label": "Four Vedas",
      "type": "place",
      "chapter": 1,
      "sub": "Rig Yajur Sama Atharva",
      "what": "Rig, Yajur, Sama and Atharva: the sacred knowledge (p.4).",
      "origin": "They arise from Brahma while he meditates after shaping the world.",
      "why": "Knowledge that creation depends on. When the brothers hide them, Brahma's work is in danger (p.6), and Vishnu recovers them (p.7).",
      "also": [],
      "parallel": null
    },
    {
      "id": "mk",
      "no": 13,
      "label": "Madhu & Kaitabha",
      "type": "being",
      "chapter": 2,
      "sub": "born of Vishnu's earwax",
      "what": "Two brothers: Madhu, named for craving honey, and Kaitabha, who looks like an insect (p.5).",
      "origin": "They emerge from Vishnu's earwax right after the Vedas appear.",
      "why": "First of Brahma's four troubles. Their arrogance endangers creation and they hide the Vedas. Their deaths provide the world's land and plates, and give Vishnu the name Madhusudan.",
      "also": [
        {
          "tag": "Certain",
          "text": "Devi Mahatmya (Markandeya Purana ch. 81-93): born from Vishnu's ear dirt, with the Goddess as the sleep Brahma invokes."
        },
        {
          "tag": "Certain",
          "text": "Matsya Purana frames them as obstructers of creation. The Mahabharata has them steal the Vedas. This telling merges both."
        }
      ],
      "parallel": {
        "tag": "Guessing",
        "text": "Often read as primordial turbulence before order, not as a physical event."
      }
    },
    {
      "id": "theft",
      "no": 14,
      "label": "Theft of the Vedas",
      "type": "event",
      "chapter": 2,
      "sub": "the brothers take the Vedas",
      "what": "Madhu and Kaitabha take the four Vedas from Brahma and hide them (p.6).",
      "origin": "The brothers grow arrogant soon after they are born and turn on the work of creation.",
      "why": "Brahma cannot create without the Vedas, so he has to wake Vishnu. This sets the fight in motion.",
      "also": [
        {
          "tag": "Certain",
          "text": "The Mahabharata has the two brothers steal the Vedas."
        }
      ],
      "parallel": null
    },
    {
      "id": "nidra",
      "no": 15,
      "label": "Nidra",
      "type": "concept",
      "chapter": 2,
      "sub": "sleep holding Vishnu",
      "what": "Sleep treated as a power, the force that keeps Vishnu in Yoga Nidra, a deep trance-like state that shuts him off from the world (p.6).",
      "origin": "Brahma invokes it by name when shouting fails.",
      "why": "Shows that even the Preserver is subject to a force; Brahma wakes him only by appealing to it. In the Devi Mahatmya this role belongs to the Goddess herself. [Certain]",
      "also": [
        {
          "tag": "Certain",
          "text": "In the Devi Mahatmya, Yoga Nidra is the Goddess herself, and she leaves Vishnu so he can wake. Mahagatha keeps Nidra impersonal so far."
        }
      ],
      "parallel": null
    },
    {
      "id": "haya",
      "no": 16,
      "label": "Hayagriva",
      "type": "deity",
      "chapter": 2,
      "sub": "horse-headed Vishnu",
      "what": "The horse-headed form Vishnu takes to fight the brothers (p.6).",
      "origin": "He adopts it as soon as Nidra releases him.",
      "why": "The turning point. After 5,000 years strength fails, so he switches to a trick based on a boon, and swells to a size that hides his face (p.7).",
      "also": [
        {
          "tag": "Certain",
          "text": "Devi Bhagavata Purana 1.5 tells a horse-head story, as a beheading rather than a battle form."
        },
        {
          "tag": "Likely",
          "text": "The Mahabharata (Shanti Parva) has Hayagriva retrieving the Vedas."
        }
      ],
      "parallel": null
    },
    {
      "id": "slay",
      "no": 17,
      "label": "Slaying of the brothers",
      "type": "event",
      "chapter": 2,
      "sub": "the 5,000-year fight ends",
      "what": "Vishnu, in his horse-headed form, fights the brothers for 5,000 years and finally kills them on his thighs (p.7).",
      "origin": "Force alone fails. The brothers can only die where there is no water, so Vishnu grows until his thighs are such a place.",
      "why": "The Vedas are recovered and creation resumes. The fat of the brothers becomes the land and their bodies the twelve plates. Vishnu gains the name Madhusudan.",
      "also": [
        {
          "tag": "Certain",
          "text": "Devi Mahatmya (Markandeya Purana ch. 81-93) tells the killing, with the Goddess as the sleep that must first leave Vishnu."
        }
      ],
      "parallel": null
    },
    {
      "id": "earth",
      "no": 18,
      "label": "Earth (Medini)",
      "type": "place",
      "chapter": 2,
      "sub": "made from their fat",
      "what": "The Earth, named Medini after meda (fat), made from the brothers' fat, with soil not fit to eat (p.7-8).",
      "origin": "Brahma forms it on Vishnu's instruction, once the Vedas are recovered.",
      "why": "Explains the Earth's origin and name. It becomes Bhuloka among the realms (p.9).",
      "also": [
        {
          "tag": "Guessing",
          "text": "The Medini name from meda is a traditional etymology. I could not confirm which Purana gives it."
        }
      ],
      "parallel": null
    },
    {
      "id": "plates",
      "no": 19,
      "label": "12 plates",
      "type": "place",
      "chapter": 2,
      "sub": "six pieces each, two bodies",
      "what": "Twelve seismic plates, made when each brother's remains break into six pieces (p.8).",
      "origin": "The remains of Madhu and Kaitabha after the fat is used.",
      "why": "Gives the myth a modern-sounding cause for earthquakes. The wording is probably the translator's gloss. [Guessing]",
      "also": [],
      "parallel": {
        "tag": "Certain",
        "text": "Earth has roughly 7 major and 8 minor plates by common counts, not 12. Seismic plates is probably the translator's modern gloss on the myth. [Guessing]"
      }
    },
    {
      "id": "realms",
      "no": 20,
      "label": "Realms",
      "type": "place",
      "chapter": 3,
      "sub": "earth, heaven, nether, Vaikuntha",
      "what": "Bhuloka (Earth), Swargaloka (heavens), seven netherworlds such as Atala, Vitala, Sutala and Patala, and Vaikuntha above them (p.9).",
      "origin": "Brahma fills in the Earth after moulding it; all of it had been latent in the golden egg.",
      "why": "The stage for later tales of gods, humans and demons. He also adds eight mountains and seven island continents.",
      "also": [
        {
          "tag": "Likely",
          "text": "Fuller world-structures appear in Bhagavata canto 5 and Vishnu Purana book 2."
        }
      ],
      "parallel": null
    },
    {
      "id": "yugas",
      "no": 21,
      "label": "Four yugas",
      "type": "concept",
      "chapter": 3,
      "sub": "Satya Treta Dwapar Kali",
      "what": "Four ages: Satya, Treta, Dwapar and Kali, which together make a mahayuga (p.9).",
      "origin": "Brahma divides time once it starts running.",
      "why": "The frame for the whole book, which moves from Satya Yuga to Kali Yuga according to its publisher's description.",
      "also": [
        {
          "tag": "Certain",
          "text": "The Vishnu Purana lists the four yugas, as does the Manusmriti."
        }
      ],
      "parallel": {
        "tag": "Likely",
        "text": "Outside ch 1-3: Puranic texts give a mahayuga as 4.32 million years and one Brahma day as 4.32 billion. Earth is about 4.54 billion years old, the universe about 13.8 billion. The closeness to Earth's age is striking, but nothing shows the figure came from measurement."
      }
    },
    {
      "id": "kumaras",
      "no": 22,
      "label": "Kumaras",
      "type": "being",
      "chapter": 3,
      "sub": "four child sages",
      "what": "Four child sages: Sanaka, Sanatana, Sanandana and Sanatkumara, also called Manasputras and Chatursana (p.9-10).",
      "origin": "Brahma produces them from his mind to help populate the world.",
      "why": "Second trouble. They refuse to procreate and choose meditation, asking to stay children forever. Their refusal feeds the anger that produces Rudra (p.10).",
      "also": [
        {
          "tag": "Likely",
          "text": "Bhagavata Purana 3.12: the Kumaras refuse, and Brahma's anger births Rudra."
        }
      ],
      "parallel": null
    },
    {
      "id": "shiva",
      "no": 23,
      "label": "Shiva",
      "type": "deity",
      "chapter": 3,
      "sub": "Rudra, Destroyer, Tamas",
      "what": "Rudra, Mahadeva, Maharudra: the Destroyer, who presides over tamas and completes the trinity (p.11).",
      "origin": "Appears from Brahma's anger as a blazing, red-eyed being. Brahma names him Rudra, from a root linked to red and roaring.",
      "why": "Third trouble, and the basis of the division of labour: Brahma creates, Vishnu preserves, Shiva destroys and cannot create. The book says the cosmos will not blur those roles (p.12). Here Shiva is a manifestation under the Parabrahman, while Shiva-centered Puranas place him highest. [Likely]",
      "also": [
        {
          "tag": "Certain",
          "text": "Bhagavata 3.12 and the Vishnu Purana both have Rudra born from Brahma's anger."
        },
        {
          "tag": "Certain",
          "text": "Vishnu Purana makes Shiva a form Vishnu takes to destroy."
        },
        {
          "tag": "Likely",
          "text": "Shiva-centered Puranas, such as the Shiva Purana, place him highest."
        }
      ],
      "parallel": null
    },
    {
      "id": "rudras",
      "no": 24,
      "label": "11 Rudras",
      "type": "being",
      "chapter": 3,
      "sub": "eleven immortal copies",
      "what": "Eleven immortal replicas of Shiva (p.11).",
      "origin": "Shiva produces them when he first agrees to help with creation.",
      "why": "Brahma needs mortal beings, and immortals break the cycle. Shiva refuses to make mortals and leaves. Brahma assigns the Rudras eleven places: the heart, five sense organs and five elements (p.12).",
      "also": [
        {
          "tag": "Certain",
          "text": "Parentage differs. Vishnu Purana: Rudra splits into eleven. Bhagavata 6.6: children of Sarupa and Bhuta. Matsya: sons of Brahma and Surabhi. Vamana: sons of Kashyapa and Aditi."
        },
        {
          "tag": "Likely",
          "text": "Mahagatha's version, Shiva making copies of himself, is closest to the Vishnu Purana."
        }
      ],
      "parallel": {
        "tag": "Likely",
        "text": "Rudras take the heart, five senses and five elements: the body mirrors the cosmos, a standard microcosm and macrocosm idea in Vedic thought."
      }
    },
    {
      "id": "t4",
      "no": 25,
      "label": "Trouble 4",
      "type": "open",
      "chapter": 3,
      "sub": "not yet shown",
      "what": "The final trouble, announced but not yet shown (p.12).",
      "origin": "Foretold on p.4, where four troubles are mentioned.",
      "why": "An open thread. Chapter 4 should resolve it.",
      "also": [],
      "parallel": null
    }
  ],
  "edges": [
    {
      "id": "e01",
      "from": "para",
      "to": "om",
      "kind": "creates",
      "label": "wills a vibration",
      "source": "Mahagatha (Nayak)",
      "page": "2*",
      "chapter": 1,
      "meaning": "The first act of creation is a vibration, not an object: will comes before matter."
    },
    {
      "id": "e02",
      "from": "om",
      "to": "mt",
      "kind": "creates",
      "label": "first form after it",
      "source": "Mahagatha (Nayak)",
      "page": "2*",
      "chapter": 1,
      "meaning": "Sound comes before form. Maha Tattva is the first thing to take shape."
    },
    {
      "id": "e03",
      "from": "mt",
      "to": "gunas",
      "kind": "creates",
      "label": "originates",
      "source": "Mahagatha (Nayak)",
      "page": "2*",
      "chapter": 1,
      "meaning": "Maha Tattva is the root of the three qualities that drive everything after it. [Likely a variant: Samkhya has the gunas first.]"
    },
    {
      "id": "e04",
      "from": "gunas",
      "to": "pt",
      "kind": "creates",
      "label": "interplay brings forth",
      "source": "Mahagatha (Nayak)",
      "page": "2*",
      "chapter": 1,
      "meaning": "Matter is built from qualities. The five elements need all three gunas together."
    },
    {
      "id": "e05",
      "from": "pt",
      "to": "prak",
      "kind": "becomes",
      "label": "together make manifest",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The elements combine and nature becomes visible. [Guessing on which things the text means by together.]"
    },
    {
      "id": "e06",
      "from": "para",
      "to": "nar",
      "kind": "form",
      "label": "manifests as",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The formless takes a personal shape for the first time."
    },
    {
      "id": "e07",
      "from": "nar",
      "to": "waters",
      "kind": "place",
      "label": "lies on",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "Narayana is defined by the waters: his name literally means resting on water."
    },
    {
      "id": "e08",
      "from": "para",
      "to": "egg",
      "kind": "creates",
      "label": "seed grows into",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The Parabrahman is the cause of the egg. The waters act as the womb."
    },
    {
      "id": "e09",
      "from": "nar",
      "to": "vish",
      "kind": "form",
      "label": "enters egg as",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The first split in the divine: Narayana enters the egg as a preserver. Other texts treat them as one being. [Likely]"
    },
    {
      "id": "e10",
      "from": "vish",
      "to": "brah",
      "kind": "creates",
      "label": "lotus from navel",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The Creator is born from the Preserver: creation depends on preservation."
    },
    {
      "id": "e11",
      "from": "para",
      "to": "brah",
      "kind": "form",
      "label": "manifestation (Rajas)",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "Brahma is also called a manifestation of the Parabrahman, not only Vishnu's child. Both ties appear on page 3."
    },
    {
      "id": "e12",
      "from": "brah",
      "to": "egg",
      "kind": "acts",
      "label": "splits into heaven and earth",
      "source": "Mahagatha (Nayak)",
      "page": "3",
      "chapter": 1,
      "meaning": "The first act of creation proper: heaven, earth and the sky between them."
    },
    {
      "id": "e13",
      "from": "brah",
      "to": "vedas",
      "kind": "creates",
      "label": "from his meditation",
      "source": "Mahagatha (Nayak)",
      "page": "4",
      "chapter": 1,
      "meaning": "Knowledge comes from within the Creator through meditation."
    },
    {
      "id": "e14",
      "from": "vish",
      "to": "mk",
      "kind": "creates",
      "label": "born from earwax",
      "source": "Mahagatha (Nayak)",
      "page": "5*",
      "chapter": 2,
      "meaning": "The danger starts inside the Preserver's own body. Brahma later points out where the brothers came from."
    },
    {
      "id": "e16",
      "from": "brah",
      "to": "nidra",
      "kind": "acts",
      "label": "invokes to wake Vishnu",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "The Creator cannot wake the Preserver directly. He must appeal to the power of sleep."
    },
    {
      "id": "e17",
      "from": "nidra",
      "to": "vish",
      "kind": "acts",
      "label": "releases",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "Nidra letting go shows Vishnu's sleep was a force acting on him, not his choice."
    },
    {
      "id": "e18",
      "from": "vish",
      "to": "haya",
      "kind": "form",
      "label": "assumes form",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "Vishnu changes form to fight: the first avatar-like form in the book."
    },
    {
      "id": "e23",
      "from": "earth",
      "to": "realms",
      "kind": "place",
      "label": "becomes Bhuloka",
      "source": "Mahagatha (Nayak)",
      "page": "9*",
      "chapter": 3,
      "meaning": "The newly formed Earth becomes one layer of the larger world."
    },
    {
      "id": "e24",
      "from": "brah",
      "to": "realms",
      "kind": "creates",
      "label": "creates",
      "source": "Mahagatha (Nayak)",
      "page": "9*",
      "chapter": 3,
      "meaning": "Brahma builds the layered worlds from what the egg held."
    },
    {
      "id": "e25",
      "from": "brah",
      "to": "yugas",
      "kind": "creates",
      "label": "divides time",
      "source": "Mahagatha (Nayak)",
      "page": "9*",
      "chapter": 3,
      "meaning": "Time begins and he divides it into the four yugas."
    },
    {
      "id": "e26",
      "from": "brah",
      "to": "kumaras",
      "kind": "creates",
      "label": "from his mind; they refuse to procreate",
      "source": "Mahagatha (Nayak)",
      "page": "9-10",
      "chapter": 3,
      "meaning": "His mind-born sons refuse his task, and creation cannot go on through them."
    },
    {
      "id": "e27",
      "from": "brah",
      "to": "shiva",
      "kind": "creates",
      "label": "anger births Rudra",
      "source": "Mahagatha (Nayak)",
      "page": "10",
      "chapter": 3,
      "meaning": "Rage becomes a god: destruction is born from the Creator's own anger."
    },
    {
      "id": "e28",
      "from": "para",
      "to": "shiva",
      "kind": "form",
      "label": "manifestation (Tamas)",
      "source": "Mahagatha (Nayak)",
      "page": "11",
      "chapter": 3,
      "meaning": "Rudra is declared a manifestation of the Parabrahman presiding over tamas, which completes the trinity (p.11)."
    },
    {
      "id": "e29",
      "from": "shiva",
      "to": "rudras",
      "kind": "form",
      "label": "multiplies himself",
      "source": "Mahagatha (Nayak)",
      "page": "11",
      "chapter": 3,
      "meaning": "Shiva multiplies himself instead of creating mortals."
    },
    {
      "id": "e30",
      "from": "brah",
      "to": "rudras",
      "kind": "acts",
      "label": "allots 11 sites",
      "source": "Mahagatha (Nayak)",
      "page": "12",
      "chapter": 3,
      "meaning": "Brahma finds homes for the immortals inside the body, so the cosmos is mirrored in the body."
    },
    {
      "id": "e31",
      "from": "brah",
      "to": "t4",
      "kind": "acts",
      "label": "faces next",
      "source": "Mahagatha (Nayak)",
      "page": "12",
      "chapter": 3,
      "meaning": "Brahma resumes work already expecting the final trouble."
    },
    {
      "id": "v1",
      "from": "mk",
      "to": "theft",
      "kind": "conflict",
      "label": "steal and hide the Vedas",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "Taking the Vedas threatens creation itself, since Brahma loses the knowledge he works with."
    },
    {
      "id": "v2",
      "from": "vedas",
      "to": "theft",
      "kind": "acts",
      "label": "are taken",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "The Vedas are what is at stake: without them the Creator has no knowledge to work from."
    },
    {
      "id": "v3",
      "from": "brah",
      "to": "theft",
      "kind": "acts",
      "label": "loses his knowledge",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "Brahma is the one harmed. He cannot get the Vedas back himself, which is why he turns to Vishnu."
    },
    {
      "id": "v4",
      "from": "theft",
      "to": "slay",
      "kind": "becomes",
      "label": "leads to the fight",
      "source": "Mahagatha (Nayak)",
      "page": "6",
      "chapter": 2,
      "meaning": "The theft is the reason Vishnu is woken and takes the field."
    },
    {
      "id": "v5",
      "from": "haya",
      "to": "slay",
      "kind": "conflict",
      "label": "kills them on his thighs",
      "source": "Mahagatha (Nayak)",
      "page": "7",
      "chapter": 2,
      "meaning": "Force fails after 5,000 years. A boon trick works: they can only die where there is no water, and Vishnu grows until his thighs are that place."
    },
    {
      "id": "v6",
      "from": "mk",
      "to": "slay",
      "kind": "acts",
      "label": "are killed",
      "source": "Mahagatha (Nayak)",
      "page": "7",
      "chapter": 2,
      "meaning": "They can only die where there is no water, and that condition is what undoes them."
    },
    {
      "id": "v7",
      "from": "slay",
      "to": "vedas",
      "kind": "becomes",
      "label": "Vedas recovered",
      "source": "Mahagatha (Nayak)",
      "page": "7",
      "chapter": 2,
      "meaning": "With the brothers dead, the Vedas can be retrieved and creation resumes."
    },
    {
      "id": "v8",
      "from": "slay",
      "to": "earth",
      "kind": "becomes",
      "label": "fat becomes land",
      "source": "Mahagatha (Nayak)",
      "page": "7",
      "chapter": 2,
      "meaning": "The brothers' fat becomes land: the death of the demons becomes the Earth's substance."
    },
    {
      "id": "v9",
      "from": "slay",
      "to": "plates",
      "kind": "becomes",
      "label": "bodies become plates",
      "source": "Mahagatha (Nayak)",
      "page": "8",
      "chapter": 2,
      "meaning": "The rest of their bodies become the twelve plates."
    }
  ],
  "story": [
    {
      "title": "Only the Parabrahman",
      "pages": "2*",
      "nodes": [
        "para"
      ],
      "edges": [],
      "text": "Before anything exists there is only the formless, limitless source."
    },
    {
      "title": "Will becomes sound, then matter",
      "pages": "2*-3",
      "nodes": [
        "para",
        "om",
        "mt",
        "gunas",
        "pt",
        "prak"
      ],
      "edges": [
        "e01",
        "e02",
        "e03",
        "e04",
        "e05"
      ],
      "text": "Its will vibrates as Om. The first element forms and splits into three gunas, which make the five elements and nature."
    },
    {
      "title": "Narayana and the golden egg",
      "pages": "3",
      "nodes": [
        "para",
        "waters",
        "nar",
        "egg"
      ],
      "edges": [
        "e06",
        "e07",
        "e08"
      ],
      "text": "It appears as Narayana on the waters, then plants a seed that grows into a golden egg: the cosmos."
    },
    {
      "title": "Vishnu and Brahma appear",
      "pages": "3",
      "nodes": [
        "para",
        "nar",
        "egg",
        "vish",
        "brah"
      ],
      "edges": [
        "e09",
        "e10",
        "e11"
      ],
      "text": "Narayana enters the egg as Vishnu. A lotus grows from his navel and Brahma is born from it."
    },
    {
      "title": "Creation begins",
      "pages": "3-4",
      "nodes": [
        "brah",
        "egg",
        "vedas"
      ],
      "edges": [
        "e12",
        "e13"
      ],
      "text": "After a year inside, Brahma splits the egg into heaven and earth, then meditates and the four Vedas arise. Four troubles are foretold."
    },
    {
      "title": "Trouble 1: two brothers",
      "pages": "5-6",
      "nodes": [
        "vish",
        "brah",
        "vedas",
        "mk",
        "theft"
      ],
      "edges": [
        "e14",
        "v1",
        "v2",
        "v3"
      ],
      "text": "Madhu and Kaitabha crawl out of Vishnu's earwax, grow arrogant, attack Brahma and hide the Vedas underwater."
    },
    {
      "title": "Waking Vishnu",
      "pages": "6",
      "nodes": [
        "vish",
        "brah",
        "nidra"
      ],
      "edges": [
        "e16",
        "e17"
      ],
      "text": "Vishnu is in Yoga Nidra and cannot hear. Brahma begs Nidra to release him."
    },
    {
      "title": "Hayagriva tricks them",
      "pages": "6-7",
      "nodes": [
        "vish",
        "vedas",
        "mk",
        "haya",
        "slay"
      ],
      "edges": [
        "e18",
        "v4",
        "v5",
        "v6",
        "v7"
      ],
      "text": "After 5,000 years of fighting, Vishnu offers a boon and asks for their deaths. He kills them on his thighs, the only place with no water, and retrieves the Vedas."
    },
    {
      "title": "Their bodies make the Earth",
      "pages": "7-8",
      "nodes": [
        "mk",
        "earth",
        "plates",
        "slay"
      ],
      "edges": [
        "v8",
        "v9"
      ],
      "text": "Their fat becomes land, called Medini. The remains break into twelve plates."
    },
    {
      "title": "Brahma fills the world",
      "pages": "9",
      "nodes": [
        "brah",
        "earth",
        "realms",
        "yugas"
      ],
      "edges": [
        "e23",
        "e24",
        "e25"
      ],
      "text": "He adds mountains, continents, rivers, the worlds above and below, and divides time into four yugas."
    },
    {
      "title": "Trouble 2: the Kumaras refuse",
      "pages": "9-10",
      "nodes": [
        "brah",
        "kumaras"
      ],
      "edges": [
        "e26"
      ],
      "text": "His four mind-born sons refuse to procreate and choose meditation. He grants their wish to stay ageless children."
    },
    {
      "title": "Trouble 3: Rudra is born",
      "pages": "10-11",
      "nodes": [
        "para",
        "brah",
        "shiva"
      ],
      "edges": [
        "e27",
        "e28"
      ],
      "text": "Brahma's rage produces a roaring red-eyed being. Brahma names him Rudra. He is Shiva, the third god."
    },
    {
      "title": "Shiva multiplies and leaves",
      "pages": "11-12",
      "nodes": [
        "brah",
        "shiva",
        "rudras"
      ],
      "edges": [
        "e29",
        "e30"
      ],
      "text": "Shiva makes eleven immortal copies. Brahma insists beings must die and be reborn. Shiva refuses and leaves to meditate. Brahma gives the Rudras eleven bodily sites."
    },
    {
      "title": "Trouble 4 waits",
      "pages": "12",
      "nodes": [
        "brah",
        "t4"
      ],
      "edges": [
        "e31"
      ],
      "text": "Brahma accepts that creation is his task alone. The final trouble is coming."
    }
  ]
};
