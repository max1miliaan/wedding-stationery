/* ================================================================
   Wedding Stationery Visual Editor -- Fabric.js
   ================================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------------
  // CONSTANTS
  // ----------------------------------------------------------------
  const DPI = 96;

  const CANVAS_SIZES = {
    '5x7':     { w: 5,    h: 7,    label: 'Invitation' },
    '3.5x5':   { w: 3.5,  h: 5,    label: 'RSVP' },
    '4.25x5.5':{ w: 4.25, h: 5.5,  label: 'Details' },
    '5.5x8.5': { w: 5.5,  h: 8.5,  label: 'Program' },
    '3.5x2':   { w: 3.5,  h: 2,    label: 'Name Tag' },
    '4x9.25':  { w: 4,    h: 9.25, label: 'Menu' },
    '5x7e':    { w: 5,    h: 7,    label: 'Envelope' },
    '6x4':     { w: 6,    h: 4,    label: 'Save the Date' }
  };

  const PALETTE = {
    cream:     '#FFF8F0',
    coral:     '#E8704A',
    coralLt:   '#F2956E',
    pink:      '#E89BAE',
    golden:    '#F2C66D',
    navy:      '#1B2438',
    navyLt:    '#3A4A68',
    white:     '#FFFFFF',
    black:     '#000000'
  };

  const FONTS = [
    // Calligraphy
    { name: 'Sacramento', cat: 'calligraphy' },
    { name: 'Alex Brush', cat: 'calligraphy' },
    { name: 'Great Vibes', cat: 'calligraphy' },
    { name: 'Allura', cat: 'calligraphy' },
    { name: 'Tangerine', cat: 'calligraphy' },
    { name: 'Pinyon Script', cat: 'calligraphy' },
    { name: 'Rouge Script', cat: 'calligraphy' },
    { name: 'Euphoria Script', cat: 'calligraphy' },
    { name: 'Mr Dafoe', cat: 'calligraphy' },
    { name: 'Italianno', cat: 'calligraphy' },
    { name: 'Petit Formal Script', cat: 'calligraphy' },
    { name: 'Herr Von Muellerhoff', cat: 'calligraphy' },
    { name: 'Marck Script', cat: 'calligraphy' },
    { name: 'La Belle Aurore', cat: 'calligraphy' },
    { name: 'Parisienne', cat: 'calligraphy' },
    { name: 'Niconne', cat: 'calligraphy' },
    { name: 'Arizonia', cat: 'calligraphy' },
    { name: 'Birthstone', cat: 'calligraphy' },
    { name: 'Lavishly Yours', cat: 'calligraphy' },
    { name: 'Fleur De Leah', cat: 'calligraphy' },
    { name: 'Engagement', cat: 'calligraphy' },
    { name: 'Berkshire Swash', cat: 'calligraphy' },
    { name: 'Lovers Quarrel', cat: 'calligraphy' },
    // Script/Handwriting
    { name: 'Dancing Script', cat: 'script' },
    { name: 'Caveat', cat: 'script' },
    { name: 'Patrick Hand', cat: 'script' },
    { name: 'Kalam', cat: 'script' },
    { name: 'Indie Flower', cat: 'script' },
    { name: 'Shadows Into Light', cat: 'script' },
    { name: 'Pacifico', cat: 'script' },
    { name: 'Satisfy', cat: 'script' },
    { name: 'Yellowtail', cat: 'script' },
    { name: 'Lobster Two', cat: 'script' },
    { name: 'Architects Daughter', cat: 'script' },
    { name: 'Nothing You Could Do', cat: 'script' },
    { name: 'Reenie Beanie', cat: 'script' },
    { name: 'Homemade Apple', cat: 'script' },
    // Marker
    { name: 'Permanent Marker', cat: 'marker' },
    { name: 'Rock Salt', cat: 'marker' },
    { name: 'Amatic SC', cat: 'marker' },
    // Serif -- Classic
    { name: 'Playfair Display', cat: 'serif' },
    { name: 'Cormorant Garamond', cat: 'serif' },
    { name: 'Cormorant', cat: 'serif' },
    { name: 'Cormorant Infant', cat: 'serif' },
    { name: 'Lora', cat: 'serif' },
    { name: 'EB Garamond', cat: 'serif' },
    { name: 'Crimson Pro', cat: 'serif' },
    { name: 'Libre Baskerville', cat: 'serif' },
    { name: 'Cardo', cat: 'serif' },
    { name: 'Spectral', cat: 'serif' },
    { name: 'Merriweather', cat: 'serif' },
    { name: 'Source Serif 4', cat: 'serif' },
    { name: 'Sorts Mill Goudy', cat: 'serif' },
    { name: 'Noto Serif Display', cat: 'serif' },
    { name: 'Literata', cat: 'serif' },
    { name: 'Baskervville', cat: 'serif' },
    { name: 'Young Serif', cat: 'serif' },
    { name: 'Instrument Serif', cat: 'serif' },
    // Serif -- Display
    { name: 'Cinzel', cat: 'serif' },
    { name: 'Cinzel Decorative', cat: 'serif' },
    { name: 'Abril Fatface', cat: 'serif' },
    { name: 'Bodoni Moda', cat: 'serif' },
    { name: 'DM Serif Display', cat: 'serif' },
    { name: 'Fraunces', cat: 'serif' },
    { name: 'Antic Didone', cat: 'serif' },
    { name: 'Yeseva One', cat: 'serif' },
    { name: 'Rozha One', cat: 'serif' },
    { name: 'Marcellus', cat: 'serif' },
    // Sans -- Elegant
    { name: 'Tenor Sans', cat: 'sans' },
    { name: 'Poiret One', cat: 'sans' },
    { name: 'Forum', cat: 'sans' },
    { name: 'Josefin Sans', cat: 'sans' },
    { name: 'Raleway', cat: 'sans' },
    { name: 'Quicksand', cat: 'sans' },
    // Sans -- Modern
    { name: 'Inter', cat: 'sans' },
    { name: 'Poppins', cat: 'sans' },
    { name: 'Outfit', cat: 'sans' },
    { name: 'Plus Jakarta Sans', cat: 'sans' },
    { name: 'Manrope', cat: 'sans' },
    { name: 'Figtree', cat: 'sans' },
    { name: 'Jost', cat: 'sans' },
    { name: 'Montserrat', cat: 'sans' },
    { name: 'Nunito', cat: 'sans' },
    { name: 'Work Sans', cat: 'sans' },
    { name: 'DM Sans', cat: 'sans' },
    // Sans -- Modern (new)
    { name: 'Sora', cat: 'sans' },
    { name: 'Urbanist', cat: 'sans' },
    { name: 'Onest', cat: 'sans' },
    { name: 'Albert Sans', cat: 'sans' },
    { name: 'Red Hat Display', cat: 'sans' },
    { name: 'Hanken Grotesk', cat: 'sans' },
    { name: 'Nunito Sans', cat: 'sans' },
    { name: 'Lexend', cat: 'sans' },
    { name: 'Fira Sans', cat: 'sans' },
    { name: 'Source Sans 3', cat: 'sans' },
    { name: 'Barlow', cat: 'sans' },
    // Sans -- Geometric/Bold (Google)
    { name: 'League Spartan', cat: 'sans' },
    { name: 'League Gothic', cat: 'display' },
    // Fontshare (display)
    { name: 'Clash Display', cat: 'display' },
    { name: 'Panchang', cat: 'display' },
    { name: 'Cabinet Grotesk', cat: 'display' },
    { name: 'Chillax', cat: 'display' },
    { name: 'General Sans', cat: 'display' },
    { name: 'Switzer', cat: 'display' },
    // Fontshare (body)
    { name: 'Sentient', cat: 'serif' },
    { name: 'Satoshi', cat: 'sans' },
    { name: 'Boska', cat: 'serif' },
    { name: 'Gambetta', cat: 'serif' },
    { name: 'Ranade', cat: 'sans' },
    { name: 'Zodiak', cat: 'serif' },
    // Fontshare (new batch)
    { name: 'Archivo', cat: 'sans' },
    { name: 'Erode', cat: 'serif' },
    { name: 'Synonym', cat: 'sans' },
    { name: 'Telma', cat: 'serif' },
    { name: 'JetBrains Mono', cat: 'mono' },
    { name: 'Plein', cat: 'display' },
    { name: 'Bespoke Serif', cat: 'serif' },
    { name: 'Nippo', cat: 'display' },
    { name: 'Tanker', cat: 'display' },
    { name: 'Kola', cat: 'display' },
    // Display/Decorative (Google)
    { name: 'Uncial Antiqua', cat: 'display' },
    { name: 'Almendra Display', cat: 'display' },
    { name: 'Rye', cat: 'display' },
    { name: 'Pirata One', cat: 'display' },
    { name: 'MedievalSharp', cat: 'display' },
    { name: 'Fondamento', cat: 'display' },
    { name: 'Bungee Shade', cat: 'display' },
    { name: 'Rubik Mono One', cat: 'display' },
    // Google Fonts (downloaded, batch 2)
    { name: 'Corinthia', cat: 'calligraphy' },
    { name: 'Clicker Script', cat: 'calligraphy' },
    { name: 'Kaushan Script', cat: 'script' },
    { name: 'Cookie', cat: 'script' },
    { name: 'Courgette', cat: 'script' },
    { name: 'Playball', cat: 'script' },
    { name: 'Rochester', cat: 'calligraphy' },
    { name: 'Charm', cat: 'calligraphy' },
    { name: 'Ms Madi', cat: 'calligraphy' },
    { name: 'Style Script', cat: 'calligraphy' },
    { name: 'Gilda Display', cat: 'serif' },
    { name: 'Oranienbaum', cat: 'serif' },
    { name: 'Unna', cat: 'serif' },
    { name: 'Noto Serif', cat: 'serif' },
    { name: 'Domine', cat: 'serif' },
    { name: 'Vollkorn', cat: 'serif' },
    { name: 'Gelasio', cat: 'serif' },
    { name: 'Bitter', cat: 'serif' },
    { name: 'Vesper Libre', cat: 'serif' },
    { name: 'Vidaloka', cat: 'serif' },
    { name: 'Space Grotesk', cat: 'sans' },
    { name: 'Epilogue', cat: 'sans' },
    { name: 'Karla', cat: 'sans' },
    { name: 'Rubik', cat: 'sans' },
    { name: 'Be Vietnam Pro', cat: 'sans' },
    { name: 'Overpass', cat: 'sans' },
    { name: 'Chivo', cat: 'sans' },
    { name: 'Archivo Narrow', cat: 'sans' },
    { name: 'Sarabun', cat: 'sans' },
    { name: 'Prompt', cat: 'sans' },
    { name: 'Bebas Neue', cat: 'display' },
    { name: 'Oswald', cat: 'display' },
    { name: 'Anton', cat: 'display' },
    { name: 'Righteous', cat: 'display' },
    { name: 'Staatliches', cat: 'display' },
    { name: 'Passion One', cat: 'display' },
    { name: 'Teko', cat: 'display' },
    { name: 'Russo One', cat: 'display' },
    { name: 'Bungee', cat: 'display' },
    { name: 'Yatra One', cat: 'display' },
    { name: 'Covered By Your Grace', cat: 'script' },
    { name: 'Just Another Hand', cat: 'script' },
    { name: 'Coming Soon', cat: 'script' },
    { name: 'Sue Ellen Francisco', cat: 'script' },
    { name: 'Pangolin', cat: 'script' },
    { name: 'Philosopher', cat: 'serif' },
    { name: 'Quando', cat: 'serif' },
    { name: 'Mrs Saint Delafield', cat: 'calligraphy' },
    { name: 'Megrim', cat: 'display' },
    { name: 'Ceviche One', cat: 'display' },
    // Uploaded fonts
    { name: 'Abiyu Chan', cat: 'uploaded' },
    { name: 'Aloevera', cat: 'uploaded' },
    { name: 'Alphabet', cat: 'uploaded' },
    { name: 'Ambar Pearl', cat: 'uploaded' },
    { name: 'Angel Rhapsody', cat: 'uploaded' },
    { name: 'Anggeliana', cat: 'uploaded' },
    { name: 'Autumn In November', cat: 'uploaded' },
    { name: 'Bacalisties', cat: 'uploaded' },
    { name: 'Barcode Font', cat: 'uploaded' },
    { name: 'Batavia Sans Clean', cat: 'uploaded' },
    { name: 'Beachclub Grunge', cat: 'uploaded' },
    { name: 'Bernadette', cat: 'uploaded' },
    { name: 'Bethany Signature', cat: 'uploaded' },
    { name: 'Bettins', cat: 'uploaded' },
    { name: 'Biancha', cat: 'uploaded' },
    { name: 'Big Scratch Brush', cat: 'uploaded' },
    { name: 'Big Shine', cat: 'uploaded' },
    { name: 'Billy Hatter', cat: 'uploaded' },
    { name: 'Black Choco', cat: 'uploaded' },
    { name: 'Blakestone', cat: 'uploaded' },
    { name: 'Blantika', cat: 'uploaded' },
    { name: 'Blonding Panda', cat: 'uploaded' },
    { name: 'Blue Cirrus', cat: 'uploaded' },
    { name: 'Bobby Anderson', cat: 'uploaded' },
    { name: 'Boiling', cat: 'uploaded' },
    { name: 'Bouldster 2', cat: 'uploaded' },
    { name: 'Brandy Coffee', cat: 'uploaded' },
    { name: 'Bread', cat: 'uploaded' },
    { name: 'Bristone', cat: 'uploaded' },
    { name: 'British Castilla Script', cat: 'uploaded' },
    { name: 'Browny Joy', cat: 'uploaded' },
    { name: 'Brussels City', cat: 'uploaded' },
    { name: 'Bunaken', cat: 'uploaded' },
    { name: 'Bungee Jumpings', cat: 'uploaded' },
    { name: 'Bunny Christmas', cat: 'uploaded' },
    { name: 'Calligraphy', cat: 'uploaded' },
    { name: 'Candle Light', cat: 'uploaded' },
    { name: 'Candy Frost', cat: 'uploaded' },
    { name: 'Catthy Wellingten', cat: 'uploaded' },
    { name: 'Cherry Cocktail', cat: 'uploaded' },
    { name: 'Cheva Display', cat: 'uploaded' },
    { name: 'Christmas Reign', cat: 'uploaded' },
    { name: 'Christmas Wonderland', cat: 'uploaded' },
    { name: 'Christopher S Handwriting', cat: 'uploaded' },
    { name: 'Cloudy Aurora Script', cat: 'uploaded' },
    { name: 'Coconutz', cat: 'uploaded' },
    { name: 'Code3x', cat: 'uploaded' },
    { name: 'Coming Sans', cat: 'uploaded' },
    { name: 'Crazy Traveler Monoline', cat: 'uploaded' },
    { name: 'Creatine Youth', cat: 'uploaded' },
    { name: 'Cute Aurora', cat: 'uploaded' },
    { name: 'Cute Easter', cat: 'uploaded' },
    { name: 'Cute N Cuddly', cat: 'uploaded' },
    { name: 'Cynthian', cat: 'uploaded' },
    { name: 'Damals Quelle', cat: 'uploaded' },
    { name: 'Dance Today', cat: 'uploaded' },
    { name: 'Delius Swash Caps', cat: 'uploaded' },
    { name: 'Demonstration', cat: 'uploaded' },
    { name: 'Dodavid Gothic', cat: 'uploaded' },
    { name: 'Donathe', cat: 'uploaded' },
    { name: 'Double Trouble Sara', cat: 'uploaded' },
    { name: 'Dragon Wings', cat: 'uploaded' },
    { name: 'Drawing With Markers', cat: 'uploaded' },
    { name: 'Dreaming', cat: 'uploaded' },
    { name: 'Easter Wishes', cat: 'uploaded' },
    { name: 'Ecoplanet', cat: 'uploaded' },
    { name: 'Eigha', cat: 'uploaded' },
    { name: 'Eilya', cat: 'uploaded' },
    { name: 'Ernesto', cat: 'uploaded' },
    { name: 'Everbright Sans', cat: 'uploaded' },
    { name: 'Fast Hand', cat: 'uploaded' },
    { name: 'Gingies Bubble', cat: 'uploaded' },
    { name: 'Girlas', cat: 'uploaded' },
    { name: 'Girly Personal', cat: 'uploaded' },
    { name: 'Goligan', cat: 'uploaded' },
    { name: 'Good And Cozy', cat: 'uploaded' },
    { name: 'Great Day', cat: 'uploaded' },
    { name: 'Grilled Salmon', cat: 'uploaded' },
    { name: 'Halimun', cat: 'uploaded' },
    { name: 'Happy Lucky', cat: 'uploaded' },
    { name: 'Happy Summer', cat: 'uploaded' },
    { name: 'Hate Your Writing', cat: 'uploaded' },
    { name: 'Haverink Script', cat: 'uploaded' },
    { name: 'Hello Honey', cat: 'uploaded' },
    { name: 'Hellosty Blast', cat: 'uploaded' },
    { name: 'Hermony', cat: 'uploaded' },
    { name: 'High Pride', cat: 'uploaded' },
    { name: 'Hijrnotes', cat: 'uploaded' },
    { name: 'Home Winter', cat: 'uploaded' },
    { name: 'Homelike', cat: 'uploaded' },
    { name: 'Hopkinson', cat: 'uploaded' },
    { name: 'Housttely Signature', cat: 'uploaded' },
    { name: 'Idautomationhc39m', cat: 'uploaded' },
    { name: 'Imoon', cat: 'uploaded' },
    { name: 'Juliette Garden', cat: 'uploaded' },
    { name: 'June Gloom', cat: 'uploaded' },
    { name: 'Junior Prince', cat: 'uploaded' },
    { name: 'Kage', cat: 'uploaded' },
    { name: 'Kailey Latief', cat: 'uploaded' },
    { name: 'Karamell', cat: 'uploaded' },
    { name: 'Katika', cat: 'uploaded' },
    { name: 'Kg Fall For You', cat: 'uploaded' },
    { name: 'Kg I Need A Font', cat: 'uploaded' },
    { name: 'Kg Lego House', cat: 'uploaded' },
    { name: 'Kg Miss Kindergarten', cat: 'uploaded' },
    { name: 'Kg Royals', cat: 'uploaded' },
    { name: 'Kg Teacher Jordan', cat: 'uploaded' },
    { name: 'Kg When Oceans Rise', cat: 'uploaded' },
    { name: 'Kind Handwriting', cat: 'uploaded' },
    { name: 'Kristine Pearl', cat: 'uploaded' },
    { name: 'Lasthrue', cat: 'uploaded' },
    { name: 'Lemon Milk', cat: 'uploaded' },
    { name: 'Letter Sketch', cat: 'uploaded' },
    { name: 'Letticia', cat: 'uploaded' },
    { name: 'Liniga Serif', cat: 'uploaded' },
    { name: 'Little Birds', cat: 'uploaded' },
    { name: 'Love Rabbit', cat: 'uploaded' },
    { name: 'Loving Kitten', cat: 'uploaded' },
    { name: 'Macaque Quick', cat: 'uploaded' },
    { name: 'Machow', cat: 'uploaded' },
    { name: 'Madelican', cat: 'uploaded' },
    { name: 'Magical', cat: 'uploaded' },
    { name: 'Make Cake', cat: 'uploaded' },
    { name: 'Margin', cat: 'uploaded' },
    { name: 'Marida Cole', cat: 'uploaded' },
    { name: 'Melinda Rosalie', cat: 'uploaded' },
    { name: 'Melisa', cat: 'uploaded' },
    { name: 'Merveile', cat: 'uploaded' },
    { name: 'Mf Really Awesome', cat: 'uploaded' },
    { name: 'Misrelly', cat: 'uploaded' },
    { name: 'My Happy Ending', cat: 'uploaded' },
    { name: 'My Valentine', cat: 'uploaded' },
    { name: 'Myopium', cat: 'uploaded' },
    { name: 'Nara', cat: 'uploaded' },
    { name: 'Nashira', cat: 'uploaded' },
    { name: 'Never Say Never', cat: 'uploaded' },
    { name: 'No Virus', cat: 'uploaded' },
    { name: 'Notera', cat: 'uploaded' },
    { name: 'Oh Chewy', cat: 'uploaded' },
    { name: 'Orange Slices', cat: 'uploaded' },
    { name: 'Paper Plane', cat: 'uploaded' },
    { name: 'Partner', cat: 'uploaded' },
    { name: 'Passifille', cat: 'uploaded' },
    { name: 'Passiontea', cat: 'uploaded' },
    { name: 'Peach Flamingo Sans', cat: 'uploaded' },
    { name: 'Petter Story', cat: 'uploaded' },
    { name: 'Pijamas', cat: 'uploaded' },
    { name: 'Plavea', cat: 'uploaded' },
    { name: 'Plutoin Baff', cat: 'uploaded' },
    { name: 'Pumpkin Pie Lattes', cat: 'uploaded' },
    { name: 'Qaskin', cat: 'uploaded' },
    { name: 'Quilt Patches', cat: 'uploaded' },
    { name: 'Rafelya Carrotin', cat: 'uploaded' },
    { name: 'Rainbow Colors', cat: 'uploaded' },
    { name: 'Reactive Anchor', cat: 'uploaded' },
    { name: 'Rebeca', cat: 'uploaded' },
    { name: 'Resta Display Font', cat: 'uploaded' },
    { name: 'Riveria', cat: 'uploaded' },
    { name: 'Romance Logic', cat: 'uploaded' },
    { name: 'Romate Hood', cat: 'uploaded' },
    { name: 'Romeo Juliet', cat: 'uploaded' },
    { name: 'Roomeria', cat: 'uploaded' },
    { name: 'Roxale Story', cat: 'uploaded' },
    { name: 'Safira Beauty Font', cat: 'uploaded' },
    { name: 'Saturdate', cat: 'uploaded' },
    { name: 'Saylora', cat: 'uploaded' },
    { name: 'Second Lesson', cat: 'uploaded' },
    { name: 'Senja Mentari', cat: 'uploaded' },
    { name: 'Shepherd', cat: 'uploaded' },
    { name: 'Shine Brighter Sans', cat: 'uploaded' },
    { name: 'Sigenone', cat: 'uploaded' },
    { name: 'Somerset', cat: 'uploaded' },
    { name: 'Sophia Morgant', cat: 'uploaded' },
    { name: 'Sore', cat: 'uploaded' },
    { name: 'Southern Jannie', cat: 'uploaded' },
    { name: 'Sprinklescolors', cat: 'uploaded' },
    { name: 'Starmoon', cat: 'uploaded' },
    { name: 'Street Explorer', cat: 'uploaded' },
    { name: 'Stylus', cat: 'uploaded' },
    { name: 'Sunday Best', cat: 'uploaded' },
    { name: 'Sunday Monday', cat: 'uploaded' },
    { name: 'Sunny', cat: 'uploaded' },
    { name: 'Takadung', cat: 'uploaded' },
    { name: 'Tetteg Heart', cat: 'uploaded' },
    { name: 'The Ballpoint', cat: 'uploaded' },
    { name: 'The Great Escape', cat: 'uploaded' },
    { name: 'The Morgan', cat: 'uploaded' },
    { name: 'The Strength', cat: 'uploaded' },
    { name: 'Thunder Ragnarok', cat: 'uploaded' },
    { name: 'Umbrella', cat: 'uploaded' },
    { name: 'Weather Sunday', cat: 'uploaded' },
    { name: 'Whoa Sauce', cat: 'uploaded' },
    { name: 'Winola', cat: 'uploaded' },
    { name: 'Written In The Stars', cat: 'uploaded' },
    { name: 'Zrtw Veganmatey', cat: 'uploaded' },
  ];

  const ILLUST_CATEGORIES = ['moose', 'couple', 'toronto', 'decor', 'border', 'divider', 'corner', 'sketch', 'element'];

  const SVG_PATH = '../assets/svg/';

  const ILLUSTRATIONS = {
    moose: [
      'moose-01-sitting','moose-02-bowtie','moose-03-party-hat','moose-04-flower-crown','moose-05-sunglasses',
      'moose-06-top-hat','moose-07-collar','moose-08-bandana','moose-09-holding-heart','moose-10-ring-bearer',
      'moose-11-walking','moose-12-lying-down','moose-13-peeking','moose-14-head-only','moose-15-sleeping',
      'moose-16-running','moose-17-jumping','moose-18-back-view','moose-19-begging','moose-20-tongue-out',
      'moose-21-tuxedo','moose-22-champagne','moose-23-cake','moose-24-ring-pillow-walk','moose-25-dancing',
      'moose-26-howling','moose-27-ball','moose-28-bow','moose-29-sniffing','moose-30-curious',
      'moose-31-waving','moose-32-sign-holder','moose-33-wreath','moose-34-banner','moose-35-love-letter',
      'moose-36-flowers-mouth','moose-37-butterfly','moose-38-treat','moose-39-belly-up','moose-40-stretching',
      'moose-41-digging','moose-42-shaking','moose-43-stack-hearts','moose-44-window','moose-45-leash',
      'moose-46-photo','moose-47-pillow','moose-48-crown','moose-49-wings','moose-50-hero-cape'
    ],
    couple: [
      'couple-01-dancing','couple-02-holding-hands-front','couple-03-holding-hands-back','couple-04-silhouette-facing','couple-05-forehead-touch',
      'couple-06-dip-dance','couple-07-sitting-together','couple-08-cheek-kiss','couple-09-high-five','couple-10-arm-in-arm',
      'couple-11-under-umbrella','couple-12-sparklers','couple-13-toast','couple-14-piggyback','couple-15-hugging',
      'couple-16-on-bench','couple-17-sunset','couple-18-heart-hands','couple-19-running','couple-20-in-car',
      'couple-21-with-dog','couple-22-first-dance','couple-23-confetti','couple-24-rings-exchange','couple-25-walk-aisle',
      'couple-26-cooking','couple-27-star-gazing','couple-28-bike','couple-29-selfie','couple-30-picnic',
      'couple-31-balloons','couple-32-snowflakes','couple-33-tree-carving','couple-34-bridge','couple-35-boat',
      'couple-36-lanterns','couple-37-bookshop','couple-38-ice-cream','couple-39-champagne-pop','couple-40-doorway',
      'couple-41-kite','couple-42-coffee','couple-43-window-seat','couple-44-hands-monogram','couple-45-jumping',
      'couple-46-slow-dance','couple-47-guitar','couple-48-sunset-walk','couple-49-rose-exchange','couple-50-frame-pose'
    ],
    toronto: [
      'toronto-01-cn-tower-simple','toronto-02-cn-tower-clouds','toronto-03-cn-tower-night','toronto-04-drake-front','toronto-05-drake-rooftop',
      'toronto-06-drake-sign','toronto-07-drake-entrance','toronto-08-queen-west-street','toronto-09-queen-west-shops','toronto-10-queen-west-cafe',
      'toronto-11-streetcar-side','toronto-12-streetcar-front','toronto-13-skyline-simple','toronto-14-skyline-waterfront','toronto-15-skyline-sunset',
      'toronto-16-toronto-sign','toronto-17-kensington','toronto-18-distillery','toronto-19-island-view','toronto-20-rooftop-view',
      'toronto-21-string-lights','toronto-22-cocktail-bar','toronto-23-food-station','toronto-24-winter-toronto','toronto-25-summer-patio',
      'toronto-26-ferry','toronto-27-bike-path','toronto-28-graffiti-alley','toronto-29-st-lawrence-market','toronto-30-high-park',
      'toronto-31-royal-ontario-museum','toronto-32-casa-loma','toronto-33-flatiron','toronto-34-harbourfront','toronto-35-dundas-square',
      'toronto-36-chinatown-gate','toronto-37-cherry-blossoms','toronto-38-nathan-phillips','toronto-39-lake-ontario','toronto-40-rooftop-bar',
      'toronto-41-patio-umbrella','toronto-42-brunch-scene','toronto-43-sunset-skyline','toronto-44-bridge-night','toronto-45-little-italy',
      'toronto-46-music-venue','toronto-47-art-gallery','toronto-48-waterfront-trail','toronto-49-maple-leaf','toronto-50-wedding-venue'
    ],
    decor: [
      'decor-01-champagne-glasses','decor-02-cocktail-glass','decor-03-champagne-tower','decor-04-wine-bottle','decor-05-champagne-bottle',
      'decor-06-cocktail-shaker','decor-07-wedding-cake','decor-08-food-platter','decor-09-cheese-board','decor-10-cupcake',
      'decor-11-rings','decor-12-heart-large','decor-13-hearts-scatter','decor-14-confetti','decor-15-sparkles',
      'decor-16-leaf-branch','decor-17-flower-simple','decor-18-laurel-wreath','decor-19-divider-simple','decor-20-divider-ornate',
      'decor-21-divider-botanical','decor-22-divider-dots','decor-23-corner-simple','decor-24-corner-botanical','decor-25-corner-ornate',
      'decor-26-gift-box','decor-27-envelope','decor-28-wax-seal','decor-29-bell','decor-30-dove',
      'decor-31-candle','decor-32-lantern','decor-33-banner-flag','decor-34-bunting','decor-35-garland',
      'decor-36-ribbon-bow','decor-37-mason-jar','decor-38-camera','decor-39-music-notes','decor-40-feather',
      'decor-41-ampersand','decor-42-infinity','decor-43-compass','decor-44-hourglass','decor-45-diamond-gem',
      'decor-46-arrow','decor-47-key','decor-48-lock-heart','decor-49-horseshoe','decor-50-monogram-frame'
    ],
    border: [
      'border-01-single-line','border-02-double-line','border-03-thick-thin','border-04-dashed','border-05-dotted',
      'border-06-corner-marks','border-07-corner-dots','border-08-corner-squares','border-09-corner-ornate','border-10-corner-leaves',
      'border-11-circles-chain','border-12-diamonds','border-13-zigzag','border-14-waves','border-15-crosses',
      'border-16-hearts','border-17-stars','border-18-botanical','border-19-art-deco','border-20-ribbon',
      'border-21-frame-within-frame','border-22-ticket-border','border-23-postage-stamp','border-24-rope','border-25-garden-gate',
      'border-26-arrow-corners','border-27-scalloped','border-28-laurel','border-29-film-strip','border-30-piano-keys',
      'border-31-confetti-scatter','border-32-lace-edge','border-33-chain-links','border-34-vine','border-35-feather',
      'border-36-geometric','border-37-pennant','border-38-music','border-39-polaroid','border-40-envelope',
      'border-41-watercolor-edge','border-42-mosaic','border-43-celtic','border-44-bunting-top','border-45-curtain',
      'border-46-arch-top','border-47-string-lights','border-48-marquee','border-49-filigree','border-50-love-letters'
    ],
    divider: [
      'divider-01-botanical','divider-02-flourish','divider-03-wave','divider-04-dots','divider-05-arrows',
      'divider-06-geometric','divider-07-art-deco','divider-08-minimal','divider-09-ornate','divider-10-playful',
      'divider-v-01-vine','divider-v-02-geometric','divider-v-03-beaded','divider-v-04-ribbon','divider-v-05-wave'
    ],
    corner: [
      'corner-01-flourish','corner-02-botanical','corner-03-geometric','corner-04-art-deco','corner-05-minimal'
    ],
    sketch: [
      'sketch-cocktail-glass','sketch-champagne-flutes','sketch-wine-glass','sketch-champagne-bottle',
      'sketch-flower-vase','sketch-flower-bouquet','sketch-ribbon-bow','sketch-balloon',
      'sketch-bunting','sketch-disco-ball','sketch-wedding-cake','sketch-wedding-rings',
      'sketch-party-hat','sketch-confetti','sketch-hands-toast'
    ],
    element: [
      'element-brush-stroke-horizontal','element-brush-stroke-diagonal','element-brush-stroke-curved',
      'element-splash-1','element-splash-2','element-wave-1','element-wave-2',
      'element-pour-stream','element-swirl','element-squiggle-line'
    ]
  };

  // ----------------------------------------------------------------
  // STATE
  // ----------------------------------------------------------------
  let canvas;
  let currentSize = '5x7';
  let zoomLevel = 1;
  let showGrid = false;
  let showGuides = true;
  let gridOverlay = null;
  let guidesOverlay = null;

  // Undo/redo
  const undoStack = [];
  const redoStack = [];
  let skipHistory = false;
  const MAX_HISTORY = 40;

  // Smart guides
  let smartGuidesEnabled = true;
  let activeSmartGuides = [];

  // Lock / style / clipboard
  let copiedStyle = null;
  let clipboardObj = null;
  let aspectRatioLocked = true;

  // Pages
  let pages = [];
  let currentPageIndex = 0;
  let pageIdCounter = 0;

  // UI toggles
  let showRulers = false;
  let nudgeTimeout = null;

  // History panel
  let historyThumbnails = [];
  let historySnapshotCounter = 0;

  // BG removal module (lazy loaded)
  let bgRemovalModule = null;

  // Cloud save (Supabase)
  let supabaseClient = null;
  let currentDesignId = null;
  let cloudSaveTimer = null;
  let isCloudSaving = false;
  let myDesignIds = [];

  // Drawing mode
  let isDrawingMode = false;
  let drawBrushColor = '#1B2438';
  let drawBrushSize = 3;
  let drawBrushOpacity = 1;
  let drawBrushType = 'pencil';

  // Supabase config -- fill in your project URL and anon key
  const SUPABASE_URL = 'https://iqocdnfewarddzuobctp.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_OBuYQnZXennKBXRVIbS3Ag_T50_rSgH';

  // ----------------------------------------------------------------
  // INITIALIZATION
  // ----------------------------------------------------------------
  function init() {
    initCanvas();
    initSidebar();
    initToolbar();
    initProperties();
    initKeyboard();
    initDragDrop();
    initContextMenu();
    initPages();
    initSupabase();
    fitCanvasToView();
    saveHistory();
    renderCanvasBgPicker();
    updateToolbarBgSwatch();
  }

  function initCanvas() {
    const size = CANVAS_SIZES[currentSize];
    const w = Math.round(size.w * DPI);
    const h = Math.round(size.h * DPI);

    canvas = new fabric.Canvas('editor-canvas', {
      width: w,
      height: h,
      backgroundColor: PALETTE.cream,
      preserveObjectStacking: true,
      selection: true,
      controlsAboveOverlay: true
    });

    // Snapping and live position tracking
    canvas.on('object:moving', (e) => {
      handleSnap(e);
      updatePositionFields(e.target);
    });
    canvas.on('object:scaling', (e) => updatePositionFields(e.target));
    canvas.on('object:rotating', (e) => updatePositionFields(e.target));
    canvas.on('object:modified', () => { hideSmartGuides(); saveHistory(); });
    canvas.on('selection:created', onSelectionChange);
    canvas.on('selection:updated', onSelectionChange);
    canvas.on('selection:cleared', onSelectionClear);
    canvas.on('text:changed', () => saveHistory());
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && !e.target.isEditing) {
        zoomToObject(e.target);
      } else if (!e.target) {
        fitCanvasToView();
      }
    });

    // Custom selection styling
    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: PALETTE.coral,
      cornerStrokeColor: PALETTE.coral,
      borderColor: PALETTE.coral,
      cornerSize: 8,
      cornerStyle: 'circle',
      borderScaleFactor: 1.5,
      padding: 4
    });
  }

  // ----------------------------------------------------------------
  // SUPABASE CLOUD SAVE
  // ----------------------------------------------------------------
  function initSupabase() {
    // Load saved design IDs from localStorage
    try {
      myDesignIds = JSON.parse(localStorage.getItem('weddingEditor_myDesignIds') || '[]');
    } catch (e) { myDesignIds = []; }

    // Initialize client if config exists
    if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // Check URL for shared design ID
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('id');
    if (sharedId && supabaseClient) {
      loadFromCloud(sharedId);
    }

    // Bind cloud buttons
    const saveBtn = document.getElementById('btn-cloud-save');
    if (saveBtn) saveBtn.addEventListener('click', () => saveToCloud());

    const shareBtn = document.getElementById('btn-share');
    if (shareBtn) shareBtn.addEventListener('click', shareDesign);

    const myDesignsBtn = document.getElementById('btn-my-designs');
    if (myDesignsBtn) myDesignsBtn.addEventListener('click', showMyDesigns);

    // Design name input
    const nameInput = document.getElementById('design-name');
    if (nameInput) {
      nameInput.addEventListener('change', () => {
        if (currentDesignId && supabaseClient) {
          debouncedCloudSave();
        }
      });
    }

    // Share modal bindings
    const shareClose = document.getElementById('share-modal-close');
    const shareDone = document.getElementById('share-modal-done');
    const shareBackdrop = document.getElementById('share-modal-backdrop');
    if (shareClose) shareClose.onclick = hideShareModal;
    if (shareDone) shareDone.onclick = hideShareModal;
    if (shareBackdrop) shareBackdrop.onclick = hideShareModal;

    const copyBtn = document.getElementById('share-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const urlInput = document.getElementById('share-url');
        if (urlInput && urlInput.value) {
          navigator.clipboard.writeText(urlInput.value).then(() => {
            copyBtn.textContent = 'Copied';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
          });
        }
      });
    }

    // My Designs modal bindings
    const designsClose = document.getElementById('designs-modal-close');
    const designsDone = document.getElementById('designs-modal-done');
    const designsBackdrop = document.getElementById('designs-modal-backdrop');
    if (designsClose) designsClose.onclick = hideDesignsModal;
    if (designsDone) designsDone.onclick = hideDesignsModal;
    if (designsBackdrop) designsBackdrop.onclick = hideDesignsModal;

    updateCloudStatus('local');
  }

  function updateCloudStatus(status, text) {
    const dot = document.getElementById('cloud-status-dot');
    const label = document.getElementById('cloud-status-text');
    if (!dot || !label) return;

    dot.className = 'cloud-status-dot';
    switch (status) {
      case 'saved':
        dot.classList.add('saved');
        label.textContent = text || 'Saved';
        break;
      case 'saving':
        dot.classList.add('saving');
        label.textContent = text || 'Saving...';
        break;
      case 'error':
        dot.classList.add('error');
        label.textContent = text || 'Error';
        break;
      default:
        label.textContent = text || 'Local';
    }
  }

  async function saveToCloud() {
    if (!supabaseClient) {
      updateCloudStatus('error', 'No cloud config');
      return;
    }

    if (isCloudSaving) return;
    isCloudSaving = true;
    updateCloudStatus('saving');

    try {
      saveCurrentPage();
      const json = canvas.toJSON();
      json._editorMeta = {
        canvasSize: currentSize,
        version: 2,
        exportedAt: new Date().toISOString(),
        pages: pages.map(p => ({ id: p.id, name: p.name, size: p.size, json: p.json })),
        currentPageIndex: currentPageIndex
      };

      const designName = document.getElementById('design-name').value || 'Untitled';

      if (currentDesignId) {
        // Update existing
        const { error } = await supabaseClient
          .from('designs')
          .update({ name: designName, data: json, updated_at: new Date().toISOString() })
          .eq('id', currentDesignId);
        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabaseClient
          .from('designs')
          .insert({ name: designName, data: json })
          .select('id')
          .single();
        if (error) throw error;
        currentDesignId = data.id;

        // Track this design as ours
        if (!myDesignIds.includes(currentDesignId)) {
          myDesignIds.push(currentDesignId);
          localStorage.setItem('weddingEditor_myDesignIds', JSON.stringify(myDesignIds));
        }

        // Update URL without reload
        const url = new URL(window.location.href);
        url.searchParams.set('id', currentDesignId);
        window.history.replaceState({}, '', url.toString());
      }

      updateCloudStatus('saved');
    } catch (err) {
      console.error('Cloud save failed:', err);
      updateCloudStatus('error', 'Save failed');
    } finally {
      isCloudSaving = false;
    }
  }

  async function loadFromCloud(id) {
    if (!supabaseClient) return;
    updateCloudStatus('saving', 'Loading...');

    try {
      const { data, error } = await supabaseClient
        .from('designs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        updateCloudStatus('error', 'Not found');
        return;
      }

      currentDesignId = data.id;
      const nameInput = document.getElementById('design-name');
      if (nameInput) nameInput.value = data.name || 'Untitled';

      // Track if it's ours
      if (!myDesignIds.includes(id)) {
        myDesignIds.push(id);
        localStorage.setItem('weddingEditor_myDesignIds', JSON.stringify(myDesignIds));
      }

      loadFromJSON(data.data);
      updateCloudStatus('saved');
    } catch (err) {
      console.error('Cloud load failed:', err);
      updateCloudStatus('error', 'Load failed');
    }
  }

  async function forkDesign() {
    const oldId = currentDesignId;
    currentDesignId = null;

    const nameInput = document.getElementById('design-name');
    if (nameInput) nameInput.value = (nameInput.value || 'Untitled') + ' (copy)';

    // Remove ?id from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    window.history.replaceState({}, '', url.toString());

    await saveToCloud();
  }

  async function shareDesign() {
    if (!supabaseClient) {
      updateCloudStatus('error', 'No cloud config');
      return;
    }

    // Save first if not already saved
    if (!currentDesignId) {
      await saveToCloud();
    }

    if (!currentDesignId) return;

    const shareUrl = window.location.origin + window.location.pathname + '?id=' + currentDesignId;
    document.getElementById('share-url').value = shareUrl;

    document.getElementById('share-modal-backdrop').classList.add('visible');
    document.getElementById('share-modal').classList.add('visible');
  }

  function hideShareModal() {
    document.getElementById('share-modal-backdrop').classList.remove('visible');
    document.getElementById('share-modal').classList.remove('visible');
  }

  async function showMyDesigns() {
    document.getElementById('designs-modal-backdrop').classList.add('visible');
    document.getElementById('designs-modal').classList.add('visible');

    const list = document.getElementById('designs-list');
    list.innerHTML = '<p style="text-align: center; color: var(--ed-text-muted); font-size: 12px; padding: 20px;">Loading...</p>';

    if (!supabaseClient || myDesignIds.length === 0) {
      list.innerHTML = '<p style="text-align: center; color: var(--ed-text-muted); font-size: 12px; padding: 20px;">No saved designs yet. Save a design to see it here.</p>';
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('designs')
        .select('id, name, created_at, updated_at')
        .in('id', myDesignIds)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--ed-text-muted); font-size: 12px; padding: 20px;">No saved designs yet.</p>';
        return;
      }

      list.innerHTML = '';
      data.forEach(design => {
        const item = document.createElement('div');
        item.className = 'design-item';
        const updated = new Date(design.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        const isCurrent = design.id === currentDesignId;

        item.innerHTML = `
          <div class="design-item-info">
            <div class="design-item-name">${design.name || 'Untitled'}${isCurrent ? ' (current)' : ''}</div>
            <div class="design-item-date">${updated}</div>
          </div>
          <div class="design-item-actions">
            ${!isCurrent ? '<button class="design-item-btn primary" data-action="open">Open</button>' : ''}
            <button class="design-item-btn" data-action="fork">Fork</button>
          </div>
        `;

        const openBtn = item.querySelector('[data-action="open"]');
        if (openBtn) {
          openBtn.addEventListener('click', () => {
            hideDesignsModal();
            const url = new URL(window.location.href);
            url.searchParams.set('id', design.id);
            window.history.replaceState({}, '', url.toString());
            loadFromCloud(design.id);
          });
        }

        const forkBtn = item.querySelector('[data-action="fork"]');
        if (forkBtn) {
          forkBtn.addEventListener('click', async () => {
            hideDesignsModal();
            // Load this design, then fork it
            if (design.id !== currentDesignId) {
              await loadFromCloud(design.id);
            }
            await forkDesign();
          });
        }

        list.appendChild(item);
      });
    } catch (err) {
      console.error('Failed to load designs:', err);
      list.innerHTML = '<p style="text-align: center; color: var(--ed-text-muted); font-size: 12px; padding: 20px;">Failed to load designs.</p>';
    }
  }

  function hideDesignsModal() {
    document.getElementById('designs-modal-backdrop').classList.remove('visible');
    document.getElementById('designs-modal').classList.remove('visible');
  }

  function debouncedCloudSave() {
    if (!supabaseClient || !currentDesignId) return;
    clearTimeout(cloudSaveTimer);
    cloudSaveTimer = setTimeout(() => saveToCloud(), 3000);
  }

  // ----------------------------------------------------------------
  // CANVAS SIZE
  // ----------------------------------------------------------------
  function setCanvasSize(key) {
    currentSize = key;
    const size = CANVAS_SIZES[key];
    const w = Math.round(size.w * DPI);
    const h = Math.round(size.h * DPI);

    canvas.setWidth(w);
    canvas.setHeight(h);
    canvas.renderAll();
    updateOverlays();
    fitCanvasToView();
  }

  function fitCanvasToView() {
    const area = document.getElementById('canvas-area');
    const areaW = area.clientWidth - 60;
    const areaH = area.clientHeight - 60;
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();
    const scale = Math.min(areaW / cW, areaH / cH, 1.5);
    zoomLevel = scale;
    applyZoom();
  }

  function applyZoom() {
    const wrapper = document.getElementById('canvas-wrapper');
    wrapper.style.transform = `scale(${zoomLevel})`;
    wrapper.style.transformOrigin = 'center center';
    document.getElementById('zoom-display').textContent = Math.round(zoomLevel * 100) + '%';
  }

  // ----------------------------------------------------------------
  // GRID & GUIDES
  // ----------------------------------------------------------------
  function updateOverlays() {
    removeOverlays();
    if (showGrid) addGrid();
    if (showGuides) addGuides();
  }

  function removeOverlays() {
    if (gridOverlay) {
      gridOverlay.forEach(o => canvas.remove(o));
      gridOverlay = null;
    }
    if (guidesOverlay) {
      guidesOverlay.forEach(o => canvas.remove(o));
      guidesOverlay = null;
    }
  }

  function addGrid() {
    const step = DPI * 0.25; // 0.25 inch grid
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    gridOverlay = [];

    for (let x = step; x < w; x += step) {
      const line = new fabric.Line([x, 0, x, h], {
        stroke: 'rgba(0,0,0,0.06)',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        excludeFromExport: true
      });
      canvas.add(line);
      gridOverlay.push(line);
    }
    for (let y = step; y < h; y += step) {
      const line = new fabric.Line([0, y, w, y], {
        stroke: 'rgba(0,0,0,0.06)',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        excludeFromExport: true
      });
      canvas.add(line);
      gridOverlay.push(line);
    }
    canvas.renderAll();
  }

  function addGuides() {
    const bleed = DPI * 0.125;
    const safe = DPI * 0.25;
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    guidesOverlay = [];

    // Trim line (red dashed)
    const trim = new fabric.Rect({
      left: bleed,
      top: bleed,
      width: w - bleed * 2,
      height: h - bleed * 2,
      fill: 'transparent',
      stroke: 'rgba(232,112,74,0.35)',
      strokeWidth: 1,
      strokeDashArray: [6, 3],
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    canvas.add(trim);
    guidesOverlay.push(trim);

    // Safe zone (blue dashed)
    const safeRect = new fabric.Rect({
      left: safe,
      top: safe,
      width: w - safe * 2,
      height: h - safe * 2,
      fill: 'transparent',
      stroke: 'rgba(100,149,237,0.3)',
      strokeWidth: 1,
      strokeDashArray: [4, 4],
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    canvas.add(safeRect);
    guidesOverlay.push(safeRect);

    // Center lines
    const cx = new fabric.Line([w / 2, 0, w / 2, h], {
      stroke: 'rgba(100,149,237,0.15)',
      strokeWidth: 1,
      strokeDashArray: [2, 4],
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    const cy = new fabric.Line([0, h / 2, w, h / 2], {
      stroke: 'rgba(100,149,237,0.15)',
      strokeWidth: 1,
      strokeDashArray: [2, 4],
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    canvas.add(cx, cy);
    guidesOverlay.push(cx, cy);

    canvas.renderAll();
  }

  // ----------------------------------------------------------------
  // SNAPPING
  // ----------------------------------------------------------------
  function handleSnap(e) {
    const obj = e.target;
    if (obj.locked) return;
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();
    const snapThreshold = 6;

    const objCenter = obj.getCenterPoint();
    const canvasCenter = { x: cW / 2, y: cH / 2 };

    // Snap to center
    if (Math.abs(objCenter.x - canvasCenter.x) < snapThreshold) {
      obj.setPositionByOrigin(
        new fabric.Point(canvasCenter.x, objCenter.y),
        'center', 'center'
      );
    }
    if (Math.abs(objCenter.y - canvasCenter.y) < snapThreshold) {
      obj.setPositionByOrigin(
        new fabric.Point(objCenter.x, canvasCenter.y),
        'center', 'center'
      );
    }

    // Smart guides
    calculateSmartGuides(obj);
  }

  // ----------------------------------------------------------------
  // SMART GUIDES
  // ----------------------------------------------------------------
  function calculateSmartGuides(movingObj) {
    hideSmartGuides();
    if (!smartGuidesEnabled) return;

    const threshold = 5;
    const guides = [];
    const mb = movingObj.getBoundingRect(true);
    const mcx = mb.left + mb.width / 2;
    const mcy = mb.top + mb.height / 2;
    const mPts = { l: mb.left, cx: mcx, r: mb.left + mb.width, t: mb.top, cy: mcy, b: mb.top + mb.height };

    canvas.getObjects().forEach(other => {
      if (other === movingObj || other.excludeFromExport || !other.visible) return;
      if (other._isSmartGuide) return;
      const ob = other.getBoundingRect(true);
      const ocx = ob.left + ob.width / 2;
      const ocy = ob.top + ob.height / 2;
      const oPts = { l: ob.left, cx: ocx, r: ob.left + ob.width, t: ob.top, cy: ocy, b: ob.top + ob.height };

      // Vertical lines (x-axis alignment)
      ['l', 'cx', 'r'].forEach(mk => {
        ['l', 'cx', 'r'].forEach(ok => {
          if (Math.abs(mPts[mk] - oPts[ok]) < threshold) {
            guides.push({ type: 'v', pos: oPts[ok] });
          }
        });
      });
      // Horizontal lines (y-axis alignment)
      ['t', 'cy', 'b'].forEach(mk => {
        ['t', 'cy', 'b'].forEach(ok => {
          if (Math.abs(mPts[mk] - oPts[ok]) < threshold) {
            guides.push({ type: 'h', pos: oPts[ok] });
          }
        });
      });
    });

    showSmartGuideLines(guides);
  }

  function showSmartGuideLines(guides) {
    const seen = new Set();
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();

    guides.forEach(g => {
      const key = g.type + Math.round(g.pos);
      if (seen.has(key)) return;
      seen.add(key);

      const coords = g.type === 'v' ? [g.pos, 0, g.pos, cH] : [0, g.pos, cW, g.pos];
      const line = new fabric.Line(coords, {
        stroke: '#FF00FF', strokeWidth: 1, strokeDashArray: [4, 2],
        selectable: false, evented: false, excludeFromExport: true, _isSmartGuide: true
      });
      canvas.add(line);
      activeSmartGuides.push(line);
    });
    canvas.renderAll();
  }

  function hideSmartGuides() {
    activeSmartGuides.forEach(l => canvas.remove(l));
    activeSmartGuides = [];
  }

  // ----------------------------------------------------------------
  // LOCK / GROUP / UNGROUP
  // ----------------------------------------------------------------
  function toggleLock(obj) {
    if (!obj) return;
    if (obj.locked) {
      obj.locked = false;
      obj.selectable = true;
      obj.evented = true;
      obj.opacity = obj._preLockOpacity || 1;
    } else {
      obj._preLockOpacity = obj.opacity;
      obj.locked = true;
      obj.selectable = false;
      obj.evented = false;
      obj.opacity = Math.max(obj.opacity * 0.6, 0.3);
    }
    canvas.discardActiveObject();
    canvas.renderAll();
    onSelectionClear();
    saveHistory();
    renderLayersList();
  }

  function groupSelection() {
    const sel = canvas.getActiveObject();
    if (!sel || sel.type !== 'activeSelection') return;
    sel.toGroup();
    canvas.renderAll();
    saveHistory();
    renderLayersList();
  }

  function ungroupSelection() {
    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== 'group') return;
    obj.toActiveSelection();
    canvas.renderAll();
    saveHistory();
    renderLayersList();
  }

  // ----------------------------------------------------------------
  // COPY / PASTE STYLE
  // ----------------------------------------------------------------
  function copyStyle() {
    const obj = canvas.getActiveObject();
    if (!obj) return;
    copiedStyle = {};
    ['fill', 'stroke', 'strokeWidth', 'opacity'].forEach(p => {
      if (obj[p] !== undefined) copiedStyle[p] = obj[p];
    });
    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
      ['fontSize', 'fontFamily', 'fontWeight', 'textAlign', 'charSpacing', 'lineHeight'].forEach(p => {
        if (obj[p] !== undefined) copiedStyle[p] = obj[p];
      });
    }
  }

  function pasteStyle() {
    const obj = canvas.getActiveObject();
    if (!obj || !copiedStyle) return;
    const isText = obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox';
    Object.entries(copiedStyle).forEach(([k, v]) => {
      if (k === 'fontSize' || k === 'fontFamily' || k === 'fontWeight' || k === 'textAlign' || k === 'charSpacing' || k === 'lineHeight') {
        if (isText) obj.set(k, v);
      } else {
        obj.set(k, v);
      }
    });
    canvas.renderAll();
    saveHistory();
    onSelectionChange();
  }

  // ----------------------------------------------------------------
  // SIDEBAR
  // ----------------------------------------------------------------
  function initSidebar() {
    // Tab switching
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');

        // Exit drawing mode when switching away from Draw tab
        if (tab.dataset.tab !== 'draw' && isDrawingMode) {
          isDrawingMode = false;
          canvas.isDrawingMode = false;
          const toggleBtn = document.getElementById('btn-draw-toggle');
          if (toggleBtn) {
            toggleBtn.textContent = 'Start Drawing';
            toggleBtn.style.background = '';
            toggleBtn.style.color = '';
          }
        }
      });
    });

    initIllustrationBrowser();
    initTextPresets();
    initShapeButtons();
    initDrawing();
    initPresets();
    initBorderPlacement();
  }

  function initIllustrationBrowser() {
    const catsEl = document.getElementById('illust-cats');
    const gridEl = document.getElementById('illust-grid');

    // Category buttons
    ILLUST_CATEGORIES.forEach((cat, i) => {
      const btn = document.createElement('div');
      btn.className = 'illust-cat' + (i === 0 ? ' active' : '');
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.dataset.cat = cat;
      btn.addEventListener('click', () => {
        catsEl.querySelectorAll('.illust-cat').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        selectedIllustCategory = cat;
        renderIllustGrid(cat);
        updateBorderPlacementVisibility(cat);
      });
      catsEl.appendChild(btn);
    });

    renderIllustGrid('moose');
  }

  function renderIllustGrid(cat) {
    const gridEl = document.getElementById('illust-grid');
    gridEl.innerHTML = '';

    const items = ILLUSTRATIONS[cat];
    items.forEach(filename => {
      const thumb = document.createElement('div');
      thumb.className = 'illust-thumb';
      thumb.title = filename;

      const img = document.createElement('img');
      img.src = SVG_PATH + filename + '.svg';
      img.alt = filename;
      img.loading = 'lazy';
      img.onerror = function () { this.style.display = 'none'; };

      // Derive short label from filename (e.g. "moose-01-sitting" -> "sitting")
      const parts = filename.split('-');
      const shortLabel = parts.slice(2).join('-') || parts[1];

      const label = document.createElement('div');
      label.className = 'illust-label';
      label.textContent = shortLabel;

      thumb.appendChild(img);
      thumb.appendChild(label);

      thumb.addEventListener('click', () => addSvgToCanvas(filename));
      gridEl.appendChild(thumb);
    });
  }

  function addSvgToCanvas(filename) {
    const url = SVG_PATH + filename + '.svg';

    fabric.loadSVGFromURL(url, function (objects, options) {
      if (!objects || objects.length === 0) {
        console.warn('Could not load SVG:', filename);
        return;
      }

      const group = fabric.util.groupSVGElements(objects, options);

      // Scale to reasonable size (max 200px)
      const maxDim = Math.max(group.width, group.height);
      if (maxDim > 200) {
        const scale = 200 / maxDim;
        group.scaleX = scale;
        group.scaleY = scale;
      }

      // Position at center
      group.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center'
      });

      // Override colors to navy for consistency
      group.set('stroke', PALETTE.navy);
      if (group._objects) {
        group._objects.forEach(obj => {
          if (obj.stroke && obj.stroke !== 'none') {
            obj.set('stroke', PALETTE.navy);
          }
          // Keep filled elements (like eyes) filled
          if (obj.fill && obj.fill !== 'none' && obj.fill !== 'transparent') {
            obj.set('fill', PALETTE.navy);
          }
        });
      }

      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.renderAll();
      saveHistory();
    });
  }

  // ----------------------------------------------------------------
  // BORDER QUICK-APPLY PLACEMENT
  // ----------------------------------------------------------------
  let selectedIllustCategory = 'moose';

  function initBorderPlacement() {
    document.querySelectorAll('[data-placement]').forEach(btn => {
      btn.addEventListener('click', () => {
        const placement = btn.dataset.placement;
        quickApplyBorder(placement);
      });
    });
  }

  function quickApplyBorder(placement) {
    // Get the currently displayed category's first visible illustration
    const gridEl = document.getElementById('illust-grid');
    const activeThumb = gridEl.querySelector('.illust-thumb');
    if (!activeThumb) return;

    // Use the active category's illustrations
    const cat = selectedIllustCategory;
    const items = ILLUSTRATIONS[cat];
    if (!items || items.length === 0) return;

    // Use the first illustration in the category
    const filename = items[0];
    const url = SVG_PATH + filename + '.svg';
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();
    const margin = DPI * 0.3; // 0.3 inch margin from edge

    const isVertical = cat === 'corner' || filename.includes('-v-');
    const isCorner = cat === 'corner';

    if (isCorner && placement === 'corners') {
      // Place 4 copies at each corner
      const positions = [
        { left: margin, top: margin, flipX: false, flipY: false },
        { left: cW - margin, top: margin, flipX: true, flipY: false },
        { left: cW - margin, top: cH - margin, flipX: true, flipY: true },
        { left: margin, top: cH - margin, flipX: false, flipY: true }
      ];
      positions.forEach(pos => {
        loadAndPlaceSvg(url, pos.left, pos.top, 80, pos.flipX, pos.flipY);
      });
    } else if (placement === 'top') {
      loadAndPlaceSvg(url, cW / 2, margin, cW * 0.7, false, false);
    } else if (placement === 'bottom') {
      loadAndPlaceSvg(url, cW / 2, cH - margin, cW * 0.7, false, false);
    } else if (placement === 'top-bottom') {
      loadAndPlaceSvg(url, cW / 2, margin, cW * 0.7, false, false);
      loadAndPlaceSvg(url, cW / 2, cH - margin, cW * 0.7, false, true);
    }
  }

  function loadAndPlaceSvg(url, x, y, targetWidth, flipX, flipY) {
    fabric.loadSVGFromURL(url, function (objects, options) {
      if (!objects || objects.length === 0) return;
      const group = fabric.util.groupSVGElements(objects, options);
      const scale = targetWidth / group.width;
      group.scaleX = scale;
      group.scaleY = scale;
      group.set({
        left: x, top: y,
        originX: 'center', originY: 'center',
        flipX: flipX, flipY: flipY,
        stroke: PALETTE.navy
      });
      if (group._objects) {
        group._objects.forEach(obj => {
          if (obj.stroke && obj.stroke !== 'none') obj.set('stroke', PALETTE.navy);
          if (obj.fill && obj.fill !== 'none' && obj.fill !== 'transparent') obj.set('fill', PALETTE.navy);
        });
      }
      canvas.add(group);
      canvas.renderAll();
      saveHistory();
    });
  }

  function updateBorderPlacementVisibility(cat) {
    const section = document.getElementById('border-placement-section');
    if (!section) return;
    const show = (cat === 'divider' || cat === 'corner' || cat === 'border');
    section.style.display = show ? 'block' : 'none';
  }

function initTextPresets() {
    document.querySelectorAll('.text-preset').forEach(preset => {
      preset.addEventListener('click', () => {
        const type = preset.dataset.textType;
        addTextToCanvas(type);
      });
    });
  }

  function addTextToCanvas(type) {
    const configs = {
      heading:  { text: 'Kash & Max',             fontFamily: 'Clash Display', fontSize: 48, fontWeight: 700, fill: PALETTE.navy },
      script:   { text: 'Together with their families', fontFamily: 'Sacramento', fontSize: 32, fontWeight: 400, fill: PALETTE.navy },
      body:     { text: 'Saturday, the third of July\nTwo thousand twenty-seven', fontFamily: 'Sentient', fontSize: 18, fontWeight: 400, fill: PALETTE.navy },
      utility:  { text: 'RSVP BY JUNE 1, 2027',   fontFamily: 'Satoshi', fontSize: 14, fontWeight: 500, fill: PALETTE.navyLt, charSpacing: 100 },
      custom:   { text: 'Your text here',          fontFamily: 'DM Sans', fontSize: 16, fontWeight: 400, fill: PALETTE.navy }
    };

    const cfg = configs[type] || configs.custom;

    const text = new fabric.IText(cfg.text, {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      fontFamily: cfg.fontFamily,
      fontSize: cfg.fontSize,
      fontWeight: cfg.fontWeight,
      fill: cfg.fill,
      textAlign: 'center',
      charSpacing: cfg.charSpacing || 0,
      lineHeight: 1.4,
      editable: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveHistory();
  }

  function initShapeButtons() {
    document.querySelectorAll('.shape-btn[data-shape]').forEach(btn => {
      btn.addEventListener('click', () => addShapeToCanvas(btn.dataset.shape));
    });

    document.getElementById('btn-upload-img').addEventListener('click', () => {
      document.getElementById('img-upload').click();
    });

    document.getElementById('img-upload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        addImageFromDataURL(ev.target.result);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });

    // URL import
    const urlBtn = document.getElementById('btn-import-url');
    const urlForm = document.getElementById('url-import-form');
    if (urlBtn && urlForm) {
      urlBtn.addEventListener('click', () => urlForm.classList.toggle('visible'));
      document.getElementById('url-import-load').addEventListener('click', () => {
        const url = document.getElementById('url-import-input').value.trim();
        if (!url) return;
        loadFromURL(url);
        urlForm.classList.remove('visible');
        document.getElementById('url-import-input').value = '';
      });
    }

    // SVG paste modal
    const svgBtn = document.getElementById('btn-paste-svg');
    if (svgBtn) {
      svgBtn.addEventListener('click', showSVGModal);
    }
  }

  function addImageFromDataURL(dataURL) {
    fabric.Image.fromURL(dataURL, function (img) {
      const maxDim = Math.max(img.width, img.height);
      const canvasMax = Math.min(canvas.getWidth(), canvas.getHeight()) * 0.5;
      if (maxDim > canvasMax) {
        const scale = canvasMax / maxDim;
        img.scaleX = scale;
        img.scaleY = scale;
      }
      img.set({
        left: canvas.getWidth() / 2, top: canvas.getHeight() / 2,
        originX: 'center', originY: 'center'
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      saveHistory();
      renderLayersList();
    });
  }

  function loadFromURL(url) {
    if (url.toLowerCase().endsWith('.svg')) {
      fabric.loadSVGFromURL(url, function (objects, options) {
        if (!objects || !objects.length) return;
        const group = fabric.util.groupSVGElements(objects, options);
        const maxDim = Math.max(group.width, group.height);
        if (maxDim > 200) { const s = 200 / maxDim; group.scaleX = s; group.scaleY = s; }
        group.set({ left: canvas.getWidth() / 2, top: canvas.getHeight() / 2, originX: 'center', originY: 'center' });
        canvas.add(group);
        canvas.setActiveObject(group);
        canvas.renderAll();
        saveHistory();
        renderLayersList();
      });
    } else {
      fabric.Image.fromURL(url, function (img) {
        if (!img) return;
        addImageFromDataURL(img.toDataURL());
      }, { crossOrigin: 'anonymous' });
    }
  }

  function showSVGModal() {
    document.getElementById('svg-modal-backdrop').classList.add('visible');
    document.getElementById('svg-modal').classList.add('visible');
    document.getElementById('svg-paste-textarea').value = '';
    document.getElementById('svg-paste-textarea').focus();

    document.getElementById('svg-modal-close').onclick = hideSVGModal;
    document.getElementById('svg-modal-cancel').onclick = hideSVGModal;
    document.getElementById('svg-modal-backdrop').onclick = hideSVGModal;
    document.getElementById('svg-modal-import').onclick = () => {
      const code = document.getElementById('svg-paste-textarea').value.trim();
      if (!code) return;
      loadFromSVGCode(code);
      hideSVGModal();
    };
  }

  function hideSVGModal() {
    document.getElementById('svg-modal-backdrop').classList.remove('visible');
    document.getElementById('svg-modal').classList.remove('visible');
  }

  function loadFromSVGCode(svgString) {
    // Strip script tags for security
    svgString = svgString.replace(/<script[\s\S]*?<\/script>/gi, '');
    fabric.loadSVGFromString(svgString, function (objects, options) {
      if (!objects || !objects.length) return;
      const group = fabric.util.groupSVGElements(objects, options);
      const maxDim = Math.max(group.width, group.height);
      if (maxDim > 200) { const s = 200 / maxDim; group.scaleX = s; group.scaleY = s; }
      group.set({ left: canvas.getWidth() / 2, top: canvas.getHeight() / 2, originX: 'center', originY: 'center' });
      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.renderAll();
      saveHistory();
      renderLayersList();
    });
  }

  function addShapeToCanvas(type) {
    let shape;
    const cx = canvas.getWidth() / 2;
    const cy = canvas.getHeight() / 2;

    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          left: cx, top: cy,
          originX: 'center', originY: 'center',
          width: 120, height: 80,
          fill: 'transparent',
          stroke: PALETTE.navy,
          strokeWidth: 2,
          rx: 4, ry: 4
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: cx, top: cy,
          originX: 'center', originY: 'center',
          radius: 50,
          fill: 'transparent',
          stroke: PALETTE.navy,
          strokeWidth: 2
        });
        break;
      case 'line':
        shape = new fabric.Line([cx - 60, cy - 30, cx + 60, cy + 30], {
          stroke: PALETTE.navy,
          strokeWidth: 2,
          strokeLineCap: 'round'
        });
        break;
      case 'hline':
        shape = new fabric.Line([cx - 80, cy, cx + 80, cy], {
          stroke: PALETTE.navy,
          strokeWidth: 1.5,
          strokeLineCap: 'round'
        });
        break;
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      saveHistory();
    }
  }

  // ----------------------------------------------------------------
  // DRAWING MODE
  // ----------------------------------------------------------------
  function initDrawing() {
    const toggleBtn = document.getElementById('btn-draw-toggle');
    const sizeSlider = document.getElementById('draw-brush-size');
    const sizeVal = document.getElementById('draw-brush-size-val');
    const opacitySlider = document.getElementById('draw-brush-opacity');
    const opacityVal = document.getElementById('draw-brush-opacity-val');
    const colorCustom = document.getElementById('draw-color-custom');
    const colorSwatches = document.querySelectorAll('#draw-color-swatches .prop-swatch');
    const typeBtns = document.querySelectorAll('.draw-type-btn');

    if (!toggleBtn) return;

    // Toggle drawing mode
    toggleBtn.addEventListener('click', () => {
      isDrawingMode = !isDrawingMode;
      canvas.isDrawingMode = isDrawingMode;

      if (isDrawingMode) {
        toggleBtn.textContent = 'Stop Drawing';
        toggleBtn.style.background = '#E8704A';
        toggleBtn.style.color = '#fff';
        applyBrush();
      } else {
        toggleBtn.textContent = 'Start Drawing';
        toggleBtn.style.background = '';
        toggleBtn.style.color = '';
      }
    });

    // Brush size
    sizeSlider.addEventListener('input', () => {
      drawBrushSize = parseInt(sizeSlider.value, 10);
      sizeVal.textContent = drawBrushSize;
      if (canvas.freeDrawingBrush) canvas.freeDrawingBrush.width = drawBrushSize;
    });

    // Brush opacity
    opacitySlider.addEventListener('input', () => {
      drawBrushOpacity = parseInt(opacitySlider.value, 10) / 100;
      opacityVal.textContent = parseInt(opacitySlider.value, 10) + '%';
      applyBrush();
    });

    // Color swatches
    colorSwatches.forEach(sw => {
      sw.addEventListener('click', () => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        drawBrushColor = sw.dataset.color;
        colorCustom.value = drawBrushColor;
        applyBrush();
      });
    });

    // Custom color
    colorCustom.addEventListener('input', (e) => {
      drawBrushColor = e.target.value;
      colorSwatches.forEach(s => s.classList.remove('active'));
      applyBrush();
    });

    // Brush type buttons
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        drawBrushType = btn.dataset.brush;
        applyBrush();
      });
    });

    // When a path is drawn, save history and ensure it's selectable
    canvas.on('path:created', (e) => {
      if (e.path) {
        e.path.set({
          selectable: true,
          evented: true,
          hasControls: true,
          hasBorders: true
        });
      }
      saveHistory();
    });
  }

  function applyBrush() {
    if (!canvas) return;

    // Compute color with opacity
    const hex = drawBrushColor;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const colorWithOpacity = 'rgba(' + r + ',' + g + ',' + b + ',' + drawBrushOpacity + ')';

    switch (drawBrushType) {
      case 'spray':
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
        canvas.freeDrawingBrush.width = drawBrushSize * 5;
        canvas.freeDrawingBrush.density = 15;
        canvas.freeDrawingBrush.dotWidthVariance = 3;
        canvas.freeDrawingBrush.color = colorWithOpacity;
        break;
      case 'circle':
        canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
        canvas.freeDrawingBrush.width = drawBrushSize;
        canvas.freeDrawingBrush.color = colorWithOpacity;
        break;
      case 'ink': {
        // Ink brush uses variable-width pencil brush with shadow for organic feel
        const brush = new fabric.PencilBrush(canvas);
        brush.width = drawBrushSize;
        brush.color = colorWithOpacity;
        brush.strokeLineCap = 'round';
        brush.strokeLineJoin = 'round';
        brush.shadow = new fabric.Shadow({
          blur: drawBrushSize * 0.5,
          offsetX: 0,
          offsetY: 0,
          color: colorWithOpacity
        });
        canvas.freeDrawingBrush = brush;
        break;
      }
      default: { // pencil
        const brush = new fabric.PencilBrush(canvas);
        brush.width = drawBrushSize;
        brush.color = colorWithOpacity;
        brush.strokeLineCap = 'round';
        brush.strokeLineJoin = 'round';
        canvas.freeDrawingBrush = brush;
        break;
      }
    }
  }

  function initPresets() {
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => loadPreset(card.dataset.preset));
    });
  }

  // ----------------------------------------------------------------
  // PRESETS (template layouts)
  // ----------------------------------------------------------------
  function loadPreset(name) {
    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = PALETTE.cream;

    // Set canvas size
    const sizeMap = {
      'invitation': '5x7',
      'save-the-date': '6x4',
      'rsvp': '3.5x5',
      'details': '4.25x5.5',
      'menu': '4x9.25',
      'program': '5.5x8.5',
      'name-tag': '3.5x2'
    };

    const sizeKey = sizeMap[name] || '5x7';
    document.getElementById('canvas-size').value = sizeKey;
    setCanvasSize(sizeKey);

    const w = canvas.getWidth();
    const h = canvas.getHeight();

    // Build preset elements
    const presets = {
      'invitation': () => {
        addPresetText('Kash & Max', 'Sacramento', 52, 400, w/2, h * 0.3, 'center', PALETTE.navy);
        addPresetText('request the pleasure of your company\nat their wedding celebration', 'Sentient', 16, 400, w/2, h * 0.42, 'center', PALETTE.navy);
        addPresetText('Saturday, the Third of July\nTwo Thousand Twenty-Seven', 'Sentient', 16, 400, w/2, h * 0.55, 'center', PALETTE.navy);
        addPresetText('at half past four in the afternoon', 'Sentient', 14, 400, w/2, h * 0.65, 'center', PALETTE.navyLt, { fontStyle: 'italic' });
        addPresetText('The Drake Hotel\nToronto, Ontario', 'Sentient', 16, 600, w/2, h * 0.75, 'center', PALETTE.navy);
        addPresetText('DINNER & DANCING TO FOLLOW', 'Satoshi', 11, 500, w/2, h * 0.87, 'center', PALETTE.navyLt, { charSpacing: 200 });
      },
      'save-the-date': () => {
        addPresetText('Save the Date', 'Sacramento', 44, 400, w/2, h * 0.3, 'center', PALETTE.navy);
        addPresetText('KASH & MAX', 'Clash Display', 28, 700, w/2, h * 0.5, 'center', PALETTE.navy, { charSpacing: 150 });
        addPresetText('July 3, 2027 -- Toronto', 'Sentient', 16, 400, w/2, h * 0.65, 'center', PALETTE.navyLt);
        addPresetText('FORMAL INVITATION TO FOLLOW', 'Satoshi', 10, 500, w/2, h * 0.8, 'center', PALETTE.navyLt, { charSpacing: 200 });
      },
      'rsvp': () => {
        addPresetText('RSVP', 'Clash Display', 32, 700, w/2, h * 0.18, 'center', PALETTE.navy);
        addPresetText('Kindly respond by June 1, 2027', 'Sentient', 14, 400, w/2, h * 0.32, 'center', PALETTE.navy, { fontStyle: 'italic' });
        addPresetText('M ___________________________', 'Sentient', 14, 400, w/2, h * 0.48, 'center', PALETTE.navy);
        addPresetText('___ Accepts with pleasure\n___ Declines with regret', 'Sentient', 13, 400, w * 0.2, h * 0.65, 'left', PALETTE.navy);
        addPresetText('Number of guests: ___', 'Sentient', 13, 400, w/2, h * 0.82, 'center', PALETTE.navy);
      },
      'details': () => {
        addPresetText('Wedding Details', 'Sacramento', 36, 400, w/2, h * 0.14, 'center', PALETTE.navy);
        addPresetText('CEREMONY', 'Satoshi', 12, 700, w/2, h * 0.28, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('4:30 PM -- The Drake Hotel Rooftop\n1150 Queen Street West, Toronto', 'Sentient', 13, 400, w/2, h * 0.37, 'center', PALETTE.navy);
        addPresetText('COCKTAIL RECEPTION', 'Satoshi', 12, 700, w/2, h * 0.52, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('6:00 PM -- The Drake Hotel\nCocktail attire requested', 'Sentient', 13, 400, w/2, h * 0.61, 'center', PALETTE.navy);
        addPresetText('ACCOMMODATIONS', 'Satoshi', 12, 700, w/2, h * 0.76, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('A block of rooms has been reserved\nat The Drake Hotel', 'Sentient', 13, 400, w/2, h * 0.85, 'center', PALETTE.navy);
      },
      'menu': () => {
        addPresetText('Menu', 'Sacramento', 40, 400, w/2, h * 0.06, 'center', PALETTE.navy);
        addPresetText('PASSED CANAPES', 'Satoshi', 11, 700, w/2, h * 0.13, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('Tuna Tartare Crisps\nBurrata & Heirloom Tomato\nMini Lobster Rolls', 'Sentient', 13, 400, w/2, h * 0.2, 'center', PALETTE.navy);
        addPresetText('MAINS', 'Satoshi', 11, 700, w/2, h * 0.32, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('Herb-Crusted Salmon\nBraised Short Rib\nWild Mushroom Risotto', 'Sentient', 13, 400, w/2, h * 0.39, 'center', PALETTE.navy);
        addPresetText('DESSERT', 'Satoshi', 11, 700, w/2, h * 0.51, 'center', PALETTE.navy, { charSpacing: 200 });
        addPresetText('Wedding Cake\nCreme Brulee\nChocolate Truffles', 'Sentient', 13, 400, w/2, h * 0.58, 'center', PALETTE.navy);
      },
      'program': () => {
        addPresetText('Order of Events', 'Sacramento', 38, 400, w/2, h * 0.08, 'center', PALETTE.navy);
        addPresetText('4:30 PM', 'Satoshi', 13, 700, w * 0.25, h * 0.18, 'right', PALETTE.coral);
        addPresetText('Ceremony', 'Sentient', 15, 400, w * 0.35, h * 0.18, 'left', PALETTE.navy);
        addPresetText('5:00 PM', 'Satoshi', 13, 700, w * 0.25, h * 0.24, 'right', PALETTE.coral);
        addPresetText('Cocktail Hour', 'Sentient', 15, 400, w * 0.35, h * 0.24, 'left', PALETTE.navy);
        addPresetText('6:00 PM', 'Satoshi', 13, 700, w * 0.25, h * 0.30, 'right', PALETTE.coral);
        addPresetText('Dinner', 'Sentient', 15, 400, w * 0.35, h * 0.30, 'left', PALETTE.navy);
        addPresetText('7:30 PM', 'Satoshi', 13, 700, w * 0.25, h * 0.36, 'right', PALETTE.coral);
        addPresetText('Dancing', 'Sentient', 15, 400, w * 0.35, h * 0.36, 'left', PALETTE.navy);
      },
      'name-tag': () => {
        addPresetText('Guest Name', 'Sacramento', 28, 400, w/2, h * 0.45, 'center', PALETTE.navy);
        addPresetText('TABLE 1', 'Satoshi', 10, 600, w/2, h * 0.75, 'center', PALETTE.navyLt, { charSpacing: 200 });
      }
    };

    if (presets[name]) {
      presets[name]();
    }

    updateOverlays();
    canvas.renderAll();
    saveHistory();
  }

  function addPresetText(text, fontFamily, fontSize, fontWeight, left, top, textAlign, fill, extra) {
    const t = new fabric.IText(text, {
      left: left,
      top: top,
      originX: textAlign === 'center' ? 'center' : (textAlign === 'right' ? 'right' : 'left'),
      originY: 'center',
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fill: fill,
      textAlign: textAlign,
      lineHeight: 1.5,
      editable: true,
      ...extra
    });
    canvas.add(t);
  }

  // ----------------------------------------------------------------
  // TOOLBAR
  // ----------------------------------------------------------------
  function initToolbar() {
    // Canvas size
    document.getElementById('canvas-size').addEventListener('change', (e) => {
      setCanvasSize(e.target.value);
    });

    // Undo/Redo
    document.getElementById('btn-undo').addEventListener('click', undo);
    document.getElementById('btn-redo').addEventListener('click', redo);

    // Grid/Guides
    document.getElementById('btn-grid').addEventListener('click', () => {
      showGrid = !showGrid;
      document.getElementById('btn-grid').classList.toggle('active', showGrid);
      updateOverlays();
    });

    document.getElementById('btn-guides').addEventListener('click', () => {
      showGuides = !showGuides;
      document.getElementById('btn-guides').classList.toggle('active', showGuides);
      updateOverlays();
    });

    // Zoom
    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      zoomLevel = Math.min(zoomLevel + 0.1, 3);
      applyZoom();
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      zoomLevel = Math.max(zoomLevel - 0.1, 0.2);
      applyZoom();
    });
    document.getElementById('btn-zoom-fit').addEventListener('click', fitCanvasToView);

    // Export
    document.getElementById('btn-export-png').addEventListener('click', exportPNG);
    document.getElementById('btn-export-json').addEventListener('click', exportJSON);
    document.getElementById('btn-load-json').addEventListener('click', () => {
      document.getElementById('json-upload').click();
    });

    document.getElementById('json-upload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        try {
          const json = JSON.parse(ev.target.result);
          loadFromJSON(json);
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    // Smart guides toggle
    const sgBtn = document.getElementById('btn-smart-guides');
    if (sgBtn) {
      sgBtn.classList.add('active');
      sgBtn.addEventListener('click', () => {
        smartGuidesEnabled = !smartGuidesEnabled;
        sgBtn.classList.toggle('active', smartGuidesEnabled);
        if (!smartGuidesEnabled) hideSmartGuides();
      });
    }

    // Rulers toggle
    const rulerBtn = document.getElementById('btn-rulers');
    if (rulerBtn) {
      rulerBtn.addEventListener('click', () => {
        showRulers = !showRulers;
        rulerBtn.classList.toggle('active', showRulers);
        toggleRulers();
      });
    }

    // PDF export
    const pdfBtn = document.getElementById('btn-export-pdf');
    if (pdfBtn) pdfBtn.addEventListener('click', exportPDF);

    // SVG export
    const svgExpBtn = document.getElementById('btn-export-svg');
    if (svgExpBtn) svgExpBtn.addEventListener('click', exportSVG);

    // Toolbar BG color
    const toolbarBgColor = document.getElementById('toolbar-bg-color');
    if (toolbarBgColor) {
      toolbarBgColor.addEventListener('input', (e) => {
        canvas.setBackgroundColor(e.target.value, () => canvas.renderAll());
        updateToolbarBgSwatch();
      });
      toolbarBgColor.addEventListener('change', () => saveHistory());
    }

    // Initialize guides toggle as active
    document.getElementById('btn-guides').classList.add('active');
    updateOverlays();
  }

  // ----------------------------------------------------------------
  // PROPERTIES PANEL
  // ----------------------------------------------------------------
  function initProperties() {
    // Properties are built dynamically when an object is selected
  }

  function onSelectionChange(e) {
    const obj = canvas.getActiveObject();
    if (!obj) return onSelectionClear();

    document.getElementById('props-empty').style.display = 'none';
    const dyn = document.getElementById('props-dynamic');
    dyn.style.display = 'block';

    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
      renderTextProperties(obj);
    } else {
      renderObjectProperties(obj);
    }
    renderLayersList();
  }

  function onSelectionClear() {
    document.getElementById('props-empty').style.display = 'block';
    document.getElementById('props-dynamic').style.display = 'none';
    renderCanvasBgPicker();
    renderLayersList();
  }

  function renderCanvasBgPicker() {
    const el = document.getElementById('props-empty');
    if (!el) return;
    const bgColor = canvas.backgroundColor || PALETTE.cream;
    el.innerHTML = `
      <div class="prop-group">
        <div class="prop-label">Canvas Background</div>
        <div class="canvas-bg-grid">
          ${Object.entries(PALETTE).map(([name, hex]) =>
            `<div class="prop-color-swatch ${bgColor === hex ? 'active' : ''}" style="background: ${hex}; ${hex === '#FFFFFF' ? 'border: 1px solid #444;' : ''}" data-bg-color="${hex}" title="${name}"></div>`
          ).join('')}
          <input type="color" class="prop-color-input" id="canvas-bg-custom" value="${bgColor}">
        </div>
      </div>
      <div class="prop-group">
        <div class="prop-label">Gradient Presets</div>
        <div class="canvas-bg-grid">
          <div class="gradient-swatch" style="background: linear-gradient(135deg, #FFF8F0, #FFFFFF);" data-bg-gradient="cream-white" title="Cream to White"></div>
          <div class="gradient-swatch" style="background: linear-gradient(135deg, #F2956E 0%, #E8704A 50%, #E89BAE 100%);" data-bg-gradient="sunset" title="Sunset"></div>
          <div class="gradient-swatch" style="background: linear-gradient(135deg, #E8704A, #F2956E);" data-bg-gradient="coral" title="Coral"></div>
          <div class="gradient-swatch" style="background: linear-gradient(180deg, #FFF8F0, #F5EDE0);" data-bg-gradient="cream-deep" title="Cream Deep"></div>
        </div>
      </div>
      <div style="text-align: center; color: var(--ed-text-muted); font-size: 11px; margin-top: 20px; line-height: 1.6;">
        Select an element on the canvas<br>to edit its properties
      </div>
    `;

    // Bind solid color swatches
    el.querySelectorAll('[data-bg-color]').forEach(sw => {
      sw.addEventListener('click', () => {
        canvas.setBackgroundColor(sw.dataset.bgColor, () => canvas.renderAll());
        saveHistory();
        renderCanvasBgPicker();
        updateToolbarBgSwatch();
      });
    });

    // Bind custom color
    const customInput = document.getElementById('canvas-bg-custom');
    if (customInput) {
      customInput.addEventListener('input', (e) => {
        canvas.setBackgroundColor(e.target.value, () => canvas.renderAll());
        updateToolbarBgSwatch();
      });
      customInput.addEventListener('change', () => saveHistory());
    }

    // Bind gradient presets
    el.querySelectorAll('[data-bg-gradient]').forEach(sw => {
      sw.addEventListener('click', () => {
        const gradients = {
          'cream-white': 'linear-gradient(135deg, #FFF8F0, #FFFFFF)',
          'sunset': 'linear-gradient(135deg, #F2956E 0%, #E8704A 50%, #E89BAE 100%)',
          'coral': 'linear-gradient(135deg, #E8704A, #F2956E)',
          'cream-deep': 'linear-gradient(180deg, #FFF8F0, #F5EDE0)'
        };
        // Fabric.js doesn't support CSS gradients directly, use solid first/last color
        const solidMap = { 'cream-white': '#FFF8F0', 'sunset': '#E8704A', 'coral': '#E8704A', 'cream-deep': '#F5EDE0' };
        canvas.setBackgroundColor(solidMap[sw.dataset.bgGradient], () => canvas.renderAll());
        saveHistory();
        renderCanvasBgPicker();
        updateToolbarBgSwatch();
      });
    });
  }

  function updateToolbarBgSwatch() {
    const swatch = document.getElementById('toolbar-bg-swatch');
    const input = document.getElementById('toolbar-bg-color');
    if (!swatch || !input) return;
    const bg = canvas.backgroundColor || PALETTE.cream;
    swatch.style.background = bg;
    input.value = bg;
  }

  function renderTextProperties(obj) {
    const dyn = document.getElementById('props-dynamic');

    dyn.innerHTML = `
      <div class="prop-group">
        <div class="prop-label">Font Family</div>
        <div class="font-search-wrap">
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="prop-font-search" placeholder="Search fonts..." value="">
        </div>
        <div class="font-list" id="prop-font-list"></div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Size & Weight</div>
        <div class="prop-row">
          <input type="number" class="prop-input prop-input-sm" id="prop-font-size" value="${Math.round(obj.fontSize)}" min="6" max="200">
          <select class="prop-select" id="prop-font-weight" style="width: 100px;">
            <option value="300" ${obj.fontWeight == 300 ? 'selected' : ''}>Light</option>
            <option value="400" ${obj.fontWeight == 400 ? 'selected' : ''}>Regular</option>
            <option value="500" ${obj.fontWeight == 500 ? 'selected' : ''}>Medium</option>
            <option value="600" ${obj.fontWeight == 600 ? 'selected' : ''}>Semibold</option>
            <option value="700" ${obj.fontWeight == 700 ? 'selected' : ''}>Bold</option>
          </select>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Color</div>
        <div class="prop-color-row" id="prop-text-colors">
          ${Object.entries(PALETTE).map(([name, hex]) =>
            `<div class="prop-color-swatch ${obj.fill === hex ? 'active' : ''}" style="background: ${hex}; ${hex === '#FFFFFF' ? 'border: 1px solid #444;' : ''}" data-color="${hex}" title="${name}"></div>`
          ).join('')}
          <input type="color" class="prop-color-input" id="prop-text-color-custom" value="${(obj.fill && obj.fill !== 'transparent') ? obj.fill : '#1B2438'}">
        </div>
        <div class="prop-row" style="margin-top: 6px;">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--ed-text-dim); cursor: pointer;">
            <input type="checkbox" id="prop-text-outline-only" ${obj.fill === 'transparent' ? 'checked' : ''}>
            Outline only (no fill)
          </label>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Text Alignment</div>
        <div class="prop-align-group">
          <button class="prop-align-btn ${obj.textAlign === 'left' ? 'active' : ''}" data-align="left" title="Left">
            <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/></svg>
          </button>
          <button class="prop-align-btn ${obj.textAlign === 'center' ? 'active' : ''}" data-align="center" title="Center">
            <svg viewBox="0 0 24 24"><line x1="5" y1="6" x2="19" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="7" y1="18" x2="17" y2="18"/></svg>
          </button>
          <button class="prop-align-btn ${obj.textAlign === 'right' ? 'active' : ''}" data-align="right" title="Right">
            <svg viewBox="0 0 24 24"><line x1="7" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Letter Spacing</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-char-spacing" min="-100" max="800" value="${obj.charSpacing || 0}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${obj.charSpacing || 0}</span>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Line Height</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-line-height" min="0.8" max="3" step="0.1" value="${obj.lineHeight || 1.4}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${(obj.lineHeight || 1.4).toFixed(1)}</span>
        </div>
      </div>

      ${renderAlignToCanvasHTML()}

      <div class="prop-group">
        <div class="prop-label">Position</div>
        <div class="pos-grid">
          <div class="pos-field">
            <span class="pos-label">X</span>
            <input type="number" class="pos-input" id="prop-left" value="${Math.round(obj.left)}">
          </div>
          <div class="pos-field">
            <span class="pos-label">Y</span>
            <input type="number" class="pos-input" id="prop-top" value="${Math.round(obj.top)}">
          </div>
          <div class="pos-field">
            <span class="pos-label">W</span>
            <input type="number" class="pos-input" id="prop-width" value="${Math.round(obj.getScaledWidth())}" readonly style="opacity: 0.5;">
          </div>
          <div class="pos-field">
            <span class="pos-label">H</span>
            <input type="number" class="pos-input" id="prop-height" value="${Math.round(obj.getScaledHeight())}" readonly style="opacity: 0.5;">
          </div>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Rotation</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-angle" min="-180" max="180" value="${Math.round(obj.angle || 0)}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.angle || 0)}&deg;</span>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Transform</div>
        <div class="flip-grid">
          <button class="flip-btn" id="prop-flip-h"><svg viewBox="0 0 24 24"><path d="M12 3v18M16 7l4 5-4 5M8 7L4 12l4 5"/></svg>Flip H</button>
          <button class="flip-btn" id="prop-flip-v"><svg viewBox="0 0 24 24"><path d="M3 12h18M7 8L12 4l5 4M7 16l5 4 5-4"/></svg>Flip V</button>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Opacity</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-opacity" min="0" max="1" step="0.05" value="${obj.opacity}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.opacity * 100)}%</span>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Stroke (Outline)</div>
        <div class="prop-row">
          <input type="color" class="prop-color-input" id="prop-text-stroke-color" value="${obj.stroke || '#1B2438'}">
          <input type="range" class="prop-slider" id="prop-text-stroke-width" min="0" max="5" step="0.5" value="${obj.strokeWidth || 0}" style="flex: 1;">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 24px; text-align: right;">${obj.strokeWidth || 0}</span>
        </div>
      </div>

      ${renderLayerHTML()}

      <div class="prop-actions">
        <button class="prop-action-btn" id="prop-lock">${obj.locked ? 'Unlock' : 'Lock'}</button>
        <button class="prop-action-btn" id="prop-copy-style">Copy Style</button>
        ${copiedStyle ? '<button class="prop-action-btn" id="prop-paste-style">Paste Style</button>' : ''}
        <button class="prop-action-btn" id="prop-duplicate">Duplicate</button>
        <button class="prop-action-btn danger" id="prop-delete">Delete</button>
      </div>
    `;

    // Bind font list
    renderFontList(obj);

    // Bind font search
    document.getElementById('prop-font-search').addEventListener('input', (e) => {
      renderFontList(obj, e.target.value);
    });

    // Bind font size
    document.getElementById('prop-font-size').addEventListener('change', (e) => {
      obj.set('fontSize', parseInt(e.target.value));
      canvas.renderAll();
      saveHistory();
    });

    // Bind font weight
    document.getElementById('prop-font-weight').addEventListener('change', (e) => {
      obj.set('fontWeight', parseInt(e.target.value));
      canvas.renderAll();
      saveHistory();
    });

    // Bind color swatches
    const outlineOnlyCheckbox = document.getElementById('prop-text-outline-only');
    document.querySelectorAll('#prop-text-colors .prop-color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        if (outlineOnlyCheckbox && outlineOnlyCheckbox.checked) {
          obj._savedFill = sw.dataset.color;
          obj.set('fill', 'transparent');
          if (!obj.stroke || obj.strokeWidth === 0) {
            obj.set({ stroke: sw.dataset.color, strokeWidth: obj.strokeWidth || 1 });
          }
        } else {
          obj.set('fill', sw.dataset.color);
        }
        canvas.renderAll();
        saveHistory();
        onSelectionChange();
      });
    });

    document.getElementById('prop-text-color-custom').addEventListener('input', (e) => {
      if (outlineOnlyCheckbox && outlineOnlyCheckbox.checked) {
        obj._savedFill = e.target.value;
        obj.set('fill', 'transparent');
        if (!obj.stroke || obj.strokeWidth === 0) {
          obj.set({ stroke: e.target.value, strokeWidth: obj.strokeWidth || 1 });
        }
      } else {
        obj.set('fill', e.target.value);
      }
      canvas.renderAll();
    });
    document.getElementById('prop-text-color-custom').addEventListener('change', () => saveHistory());

    // Bind outline-only toggle
    if (outlineOnlyCheckbox) {
      outlineOnlyCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          obj._savedFill = obj.fill;
          obj.set('fill', 'transparent');
          if (!obj.stroke || obj.strokeWidth === 0) {
            obj.set({ stroke: obj._savedFill || '#1B2438', strokeWidth: 1 });
          }
        } else {
          obj.set('fill', obj._savedFill || '#1B2438');
        }
        canvas.renderAll();
        saveHistory();
        onSelectionChange();
      });
    }

    // Bind text alignment
    document.querySelectorAll('.prop-align-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        obj.set('textAlign', btn.dataset.align);
        canvas.renderAll();
        saveHistory();
        onSelectionChange();
      });
    });

    // Bind char spacing
    const csSlider = document.getElementById('prop-char-spacing');
    csSlider.addEventListener('input', (e) => {
      obj.set('charSpacing', parseInt(e.target.value));
      csSlider.nextElementSibling.textContent = e.target.value;
      canvas.renderAll();
    });
    csSlider.addEventListener('change', () => saveHistory());

    // Bind line height
    const lhSlider = document.getElementById('prop-line-height');
    lhSlider.addEventListener('input', (e) => {
      obj.set('lineHeight', parseFloat(e.target.value));
      lhSlider.nextElementSibling.textContent = parseFloat(e.target.value).toFixed(1);
      canvas.renderAll();
    });
    lhSlider.addEventListener('change', () => saveHistory());

    // Bind position
    bindPositionInputs(obj);

    // Bind rotation
    const angSlider = document.getElementById('prop-angle');
    angSlider.addEventListener('input', (e) => {
      obj.set('angle', parseInt(e.target.value));
      angSlider.nextElementSibling.innerHTML = e.target.value + '&deg;';
      canvas.renderAll();
    });
    angSlider.addEventListener('change', () => saveHistory());

    // Bind flip
    bindFlipButtons(obj);

    // Bind opacity
    const opSlider = document.getElementById('prop-opacity');
    opSlider.addEventListener('input', (e) => {
      obj.set('opacity', parseFloat(e.target.value));
      opSlider.nextElementSibling.textContent = Math.round(parseFloat(e.target.value) * 100) + '%';
      canvas.renderAll();
    });
    opSlider.addEventListener('change', () => saveHistory());

    // Text stroke bindings
    const textStrokeColor = document.getElementById('prop-text-stroke-color');
    const textStrokeWidth = document.getElementById('prop-text-stroke-width');
    if (textStrokeColor) {
      textStrokeColor.addEventListener('input', (e) => {
        obj.set('stroke', e.target.value);
        canvas.renderAll();
      });
      textStrokeColor.addEventListener('change', () => saveHistory());
    }
    if (textStrokeWidth) {
      textStrokeWidth.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        obj.set('strokeWidth', val);
        textStrokeWidth.nextElementSibling.textContent = val;
        canvas.renderAll();
      });
      textStrokeWidth.addEventListener('change', () => saveHistory());
    }

    // Alignment and layer actions
    bindAlignActions(obj);
    bindLayerActions(obj);
    bindCommonActions(obj);
  }

  function renderObjectProperties(obj) {
    const dyn = document.getElementById('props-dynamic');
    const isGroup = obj.type === 'group';
    const isMulti = obj.type === 'activeSelection';
    const hasStroke = obj.stroke && obj.stroke !== 'transparent';
    const hasFill = obj.fill && obj.fill !== 'transparent' && obj.fill !== 'none';

    dyn.innerHTML = `
      <div class="prop-group">
        <div class="prop-label">Type</div>
        <div style="font-size: 12px; color: var(--ed-text); text-transform: capitalize;">${isMulti ? obj._objects.length + ' objects' : (isGroup ? 'Illustration' : obj.type)}</div>
      </div>

      ${renderAlignToCanvasHTML()}

      <div class="prop-group">
        <div class="prop-label">Position</div>
        <div class="pos-grid">
          <div class="pos-field">
            <span class="pos-label">X</span>
            <input type="number" class="pos-input" id="prop-left" value="${Math.round(obj.left)}">
          </div>
          <div class="pos-field">
            <span class="pos-label">Y</span>
            <input type="number" class="pos-input" id="prop-top" value="${Math.round(obj.top)}">
          </div>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Size</div>
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 4px; align-items: center;">
          <div class="pos-field">
            <span class="pos-label">W</span>
            <input type="number" class="pos-input" id="prop-width" value="${Math.round(obj.getScaledWidth())}">
          </div>
          <button class="lock-btn ${aspectRatioLocked ? 'active' : ''}" id="prop-aspect-lock" title="Lock aspect ratio">
            <svg viewBox="0 0 24 24">${aspectRatioLocked
              ? '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'
              : '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.83-1"/>'
            }</svg>
          </button>
          <div class="pos-field">
            <span class="pos-label">H</span>
            <input type="number" class="pos-input" id="prop-height" value="${Math.round(obj.getScaledHeight())}">
          </div>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Stroke</div>
        <div class="prop-color-row" id="prop-stroke-colors">
          <div class="prop-color-swatch ${!obj.stroke || obj.stroke === 'transparent' ? 'active' : ''}" style="background: repeating-conic-gradient(#555 0% 25%, #333 0% 50%) 50%/10px 10px;" data-color="transparent" title="None"></div>
          ${Object.entries(PALETTE).map(([name, hex]) =>
            `<div class="prop-color-swatch ${obj.stroke === hex ? 'active' : ''}" style="background: ${hex}; ${hex === '#FFFFFF' ? 'border: 1px solid #444;' : ''}" data-color="${hex}" title="${name}"></div>`
          ).join('')}
          <input type="color" class="prop-color-input" id="prop-stroke-custom" value="${obj.stroke && obj.stroke !== 'transparent' ? obj.stroke : '#1B2438'}">
        </div>
        <div class="prop-row" style="margin-top: 6px;">
          <span style="font-size: 10px; color: var(--ed-text-muted); width: 40px;">Width</span>
          <input type="range" class="prop-slider" id="prop-stroke-width" min="0.5" max="10" step="0.5" value="${obj.strokeWidth || 1}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${obj.strokeWidth || 1}</span>
        </div>
      </div>

      ${!isGroup && !isMulti ? `
      <div class="prop-group">
        <div class="prop-label">Fill Color</div>
        <div class="prop-color-row" id="prop-fill-colors">
          <div class="prop-color-swatch ${!hasFill ? 'active' : ''}" style="background: repeating-conic-gradient(#555 0% 25%, #333 0% 50%) 50%/10px 10px;" data-color="transparent" title="None"></div>
          ${Object.entries(PALETTE).map(([name, hex]) =>
            `<div class="prop-color-swatch ${obj.fill === hex ? 'active' : ''}" style="background: ${hex}; ${hex === '#FFFFFF' ? 'border: 1px solid #444;' : ''}" data-color="${hex}" title="${name}"></div>`
          ).join('')}
          <input type="color" class="prop-color-input" id="prop-fill-custom" value="${hasFill ? obj.fill : '#1B2438'}">
        </div>
      </div>
      ` : ''}

      <div class="prop-group">
        <div class="prop-label">Rotation</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-angle" min="-180" max="180" value="${Math.round(obj.angle || 0)}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.angle || 0)}&deg;</span>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Transform</div>
        <div class="flip-grid">
          <button class="flip-btn" id="prop-flip-h"><svg viewBox="0 0 24 24"><path d="M12 3v18M16 7l4 5-4 5M8 7L4 12l4 5"/></svg>Flip H</button>
          <button class="flip-btn" id="prop-flip-v"><svg viewBox="0 0 24 24"><path d="M3 12h18M7 8L12 4l5 4M7 16l5 4 5-4"/></svg>Flip V</button>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-label">Opacity</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-opacity" min="0" max="1" step="0.05" value="${obj.opacity}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.opacity * 100)}%</span>
        </div>
      </div>

      ${renderLayerHTML()}

      <div class="prop-actions">
        <button class="prop-action-btn" id="prop-lock">${obj.locked ? 'Unlock' : 'Lock'}</button>
        ${isMulti ? '<button class="prop-action-btn" id="prop-group">Group Selection</button>' : ''}
        ${isGroup ? '<button class="prop-action-btn" id="prop-ungroup">Ungroup</button>' : ''}
        <button class="prop-action-btn" id="prop-copy-style">Copy Style</button>
        ${copiedStyle ? '<button class="prop-action-btn" id="prop-paste-style">Paste Style</button>' : ''}
        ${obj.type === 'image' ? '<button class="prop-action-btn" id="prop-remove-bg">Remove Background</button>' : ''}
        <button class="prop-action-btn" id="prop-duplicate">Duplicate</button>
        <button class="prop-action-btn danger" id="prop-delete">Delete</button>
      </div>
    `;

    // Bind position & size
    bindPositionInputs(obj);
    bindSizeInputs(obj);

    // Bind aspect ratio lock
    const lockBtn = document.getElementById('prop-aspect-lock');
    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        aspectRatioLocked = !aspectRatioLocked;
        onSelectionChange();
      });
    }

    // Bind stroke colors + width
    const strokeColors = document.getElementById('prop-stroke-colors');
    if (strokeColors) {
      strokeColors.querySelectorAll('.prop-color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
          const val = sw.dataset.color === 'transparent' ? '' : sw.dataset.color;
          setObjectColor(obj, 'stroke', val);
          canvas.renderAll();
          saveHistory();
          onSelectionChange();
        });
      });
      const strokeCustom = document.getElementById('prop-stroke-custom');
      if (strokeCustom) {
        strokeCustom.addEventListener('input', (e) => {
          setObjectColor(obj, 'stroke', e.target.value);
          canvas.renderAll();
        });
        strokeCustom.addEventListener('change', () => saveHistory());
      }
    }
    const strokeWidthSlider = document.getElementById('prop-stroke-width');
    if (strokeWidthSlider) {
      strokeWidthSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        setObjectStrokeWidth(obj, val);
        strokeWidthSlider.nextElementSibling.textContent = val;
        canvas.renderAll();
      });
      strokeWidthSlider.addEventListener('change', () => saveHistory());
    }

    // Bind fill colors
    const fillColors = document.getElementById('prop-fill-colors');
    if (fillColors) {
      fillColors.querySelectorAll('.prop-color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
          const val = sw.dataset.color === 'transparent' ? 'transparent' : sw.dataset.color;
          obj.set('fill', val);
          canvas.renderAll();
          saveHistory();
          onSelectionChange();
        });
      });
      const fillCustom = document.getElementById('prop-fill-custom');
      if (fillCustom) {
        fillCustom.addEventListener('input', (e) => {
          obj.set('fill', e.target.value);
          canvas.renderAll();
        });
        fillCustom.addEventListener('change', () => saveHistory());
      }
    }

    // Bind rotation
    const angSlider = document.getElementById('prop-angle');
    if (angSlider) {
      angSlider.addEventListener('input', (e) => {
        obj.set('angle', parseInt(e.target.value));
        angSlider.nextElementSibling.innerHTML = e.target.value + '&deg;';
        canvas.renderAll();
      });
      angSlider.addEventListener('change', () => saveHistory());
    }

    // Bind opacity
    const opSlider = document.getElementById('prop-opacity');
    if (opSlider) {
      opSlider.addEventListener('input', (e) => {
        obj.set('opacity', parseFloat(e.target.value));
        opSlider.nextElementSibling.textContent = Math.round(parseFloat(e.target.value) * 100) + '%';
        canvas.renderAll();
      });
      opSlider.addEventListener('change', () => saveHistory());
    }

    // Bind flip
    bindFlipButtons(obj);

    bindAlignActions(obj);
    bindLayerActions(obj);
    bindCommonActions(obj);
  }

  function bindFlipButtons(obj) {
    const fh = document.getElementById('prop-flip-h');
    const fv = document.getElementById('prop-flip-v');
    if (fh) fh.addEventListener('click', () => { obj.set('flipX', !obj.flipX); canvas.renderAll(); saveHistory(); });
    if (fv) fv.addEventListener('click', () => { obj.set('flipY', !obj.flipY); canvas.renderAll(); saveHistory(); });
  }

  function setObjectColor(obj, prop, color) {
    if (obj.type === 'group' && obj._objects) {
      obj._objects.forEach(child => {
        if (child[prop] && child[prop] !== 'none' && child[prop] !== 'transparent') {
          child.set(prop, color);
        }
        // Also set fill for filled elements in SVG groups (like eyes)
        if (prop === 'stroke' && child.fill && child.fill !== 'none' && child.fill !== 'transparent' && child.fill !== PALETTE.white) {
          child.set('fill', color);
        }
      });
    } else {
      obj.set(prop, color);
    }
  }

  function setObjectStrokeWidth(obj, width) {
    if (obj.type === 'group' && obj._objects) {
      obj._objects.forEach(child => {
        if (child.stroke && child.stroke !== 'none' && child.stroke !== 'transparent') {
          child.set('strokeWidth', width);
        }
      });
    } else {
      obj.set('strokeWidth', width);
    }
  }

  function renderFontList(obj, search) {
    const listEl = document.getElementById('prop-font-list');
    if (!listEl) return;

    const query = (search || '').toLowerCase();
    const filtered = query
      ? FONTS.filter(f => f.name.toLowerCase().includes(query))
      : FONTS;

    listEl.innerHTML = filtered.map(f =>
      `<div class="font-item ${obj.fontFamily === f.name ? 'active' : ''}" data-font="${f.name}" style="font-family: '${f.name}';">${f.name}</div>`
    ).join('');

    listEl.querySelectorAll('.font-item').forEach(item => {
      item.addEventListener('click', () => {
        obj.set('fontFamily', item.dataset.font);
        canvas.renderAll();
        saveHistory();

        // Update active state
        listEl.querySelectorAll('.font-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // ----------------------------------------------------------------
  // SHARED HTML BUILDERS
  // ----------------------------------------------------------------
  function renderAlignToCanvasHTML() {
    return `
      <div class="prop-group">
        <div class="prop-label">Align to Canvas</div>
        <div class="align-grid">
          <button class="align-btn" data-align-canvas="left" title="Align left">
            <svg viewBox="0 0 24 24"><line x1="4" y1="3" x2="4" y2="21"/><rect x="8" y="6" width="10" height="4" rx="1"/><rect x="8" y="14" width="6" height="4" rx="1"/></svg>
          </button>
          <button class="align-btn" data-align-canvas="center-h" title="Align center horizontally">
            <svg viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="21" stroke-dasharray="2 2"/><rect x="5" y="6" width="14" height="4" rx="1"/><rect x="7" y="14" width="10" height="4" rx="1"/></svg>
          </button>
          <button class="align-btn" data-align-canvas="right" title="Align right">
            <svg viewBox="0 0 24 24"><line x1="20" y1="3" x2="20" y2="21"/><rect x="6" y="6" width="10" height="4" rx="1"/><rect x="10" y="14" width="6" height="4" rx="1"/></svg>
          </button>
          <button class="align-btn" data-align-canvas="top" title="Align top">
            <svg viewBox="0 0 24 24"><line x1="3" y1="4" x2="21" y2="4"/><rect x="6" y="8" width="4" height="10" rx="1"/><rect x="14" y="8" width="4" height="6" rx="1"/></svg>
          </button>
          <button class="align-btn" data-align-canvas="center-v" title="Align center vertically">
            <svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="2 2"/><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="7" width="4" height="10" rx="1"/></svg>
          </button>
          <button class="align-btn" data-align-canvas="bottom" title="Align bottom">
            <svg viewBox="0 0 24 24"><line x1="3" y1="20" x2="21" y2="20"/><rect x="6" y="6" width="4" height="10" rx="1"/><rect x="14" y="10" width="4" height="6" rx="1"/></svg>
          </button>
        </div>
        <div class="distribute-row">
          <button class="distribute-btn" data-distribute="h" title="Distribute horizontally">
            <svg viewBox="0 0 24 24"><rect x="3" y="8" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="8" rx="1"/><rect x="17" y="8" width="4" height="8" rx="1"/></svg>
            Space H
          </button>
          <button class="distribute-btn" data-distribute="v" title="Distribute vertically">
            <svg viewBox="0 0 24 24"><rect x="8" y="3" width="8" height="4" rx="1"/><rect x="8" y="10" width="8" height="4" rx="1"/><rect x="8" y="17" width="8" height="4" rx="1"/></svg>
            Space V
          </button>
        </div>
      </div>
    `;
  }

  function renderLayerHTML() {
    return `
      <div class="prop-group">
        <div class="prop-label">Layer</div>
        <div class="layer-grid">
          <button class="layer-btn" data-layer="front" title="Bring to front">
            <svg viewBox="0 0 24 24"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>
            Front
          </button>
          <button class="layer-btn" data-layer="forward" title="Bring forward">
            <svg viewBox="0 0 24 24"><polyline points="17 14 12 9 7 14"/></svg>
            Fwd
          </button>
          <button class="layer-btn" data-layer="backward" title="Send backward">
            <svg viewBox="0 0 24 24"><polyline points="7 10 12 15 17 10"/></svg>
            Back
          </button>
          <button class="layer-btn" data-layer="back" title="Send to back">
            <svg viewBox="0 0 24 24"><polyline points="7 7 12 12 17 7"/><polyline points="7 14 12 19 17 14"/></svg>
            Floor
          </button>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------------
  // POSITION / SIZE BINDING
  // ----------------------------------------------------------------
  function bindPositionInputs(obj) {
    const leftInput = document.getElementById('prop-left');
    const topInput = document.getElementById('prop-top');
    if (leftInput) {
      leftInput.addEventListener('change', (e) => {
        obj.set('left', parseInt(e.target.value));
        obj.setCoords();
        canvas.renderAll();
        saveHistory();
      });
    }
    if (topInput) {
      topInput.addEventListener('change', (e) => {
        obj.set('top', parseInt(e.target.value));
        obj.setCoords();
        canvas.renderAll();
        saveHistory();
      });
    }
  }

  function bindSizeInputs(obj) {
    const wInput = document.getElementById('prop-width');
    const hInput = document.getElementById('prop-height');
    if (wInput && !wInput.readOnly) {
      wInput.addEventListener('change', (e) => {
        const newW = parseInt(e.target.value);
        if (newW > 0) {
          const ratio = obj.scaleY / obj.scaleX;
          obj.scaleX = newW / obj.width;
          if (aspectRatioLocked) obj.scaleY = obj.scaleX * ratio;
          if (hInput) hInput.value = Math.round(obj.getScaledHeight());
          obj.setCoords();
          canvas.renderAll();
          saveHistory();
        }
      });
    }
    if (hInput && !hInput.readOnly) {
      hInput.addEventListener('change', (e) => {
        const newH = parseInt(e.target.value);
        if (newH > 0) {
          const ratio = obj.scaleX / obj.scaleY;
          obj.scaleY = newH / obj.height;
          if (aspectRatioLocked) obj.scaleX = obj.scaleY * ratio;
          if (wInput) wInput.value = Math.round(obj.getScaledWidth());
          obj.setCoords();
          canvas.renderAll();
          saveHistory();
        }
      });
    }
  }

  function updatePositionFields(obj) {
    const leftInput = document.getElementById('prop-left');
    const topInput = document.getElementById('prop-top');
    const wInput = document.getElementById('prop-width');
    const hInput = document.getElementById('prop-height');
    const angSlider = document.getElementById('prop-angle');

    if (leftInput && document.activeElement !== leftInput) leftInput.value = Math.round(obj.left);
    if (topInput && document.activeElement !== topInput) topInput.value = Math.round(obj.top);
    if (wInput && document.activeElement !== wInput) wInput.value = Math.round(obj.getScaledWidth());
    if (hInput && document.activeElement !== hInput) hInput.value = Math.round(obj.getScaledHeight());
    if (angSlider && document.activeElement !== angSlider) {
      angSlider.value = Math.round(obj.angle || 0);
      if (angSlider.nextElementSibling) angSlider.nextElementSibling.innerHTML = Math.round(obj.angle || 0) + '&deg;';
    }
  }

  // ----------------------------------------------------------------
  // CANVAS ALIGNMENT
  // ----------------------------------------------------------------
  function alignToCanvas(obj, direction) {
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();
    const bound = obj.getBoundingRect(true);

    switch (direction) {
      case 'left':
        obj.set('left', obj.left - bound.left);
        break;
      case 'center-h':
        obj.set('left', obj.left + (cW / 2) - (bound.left + bound.width / 2));
        break;
      case 'right':
        obj.set('left', obj.left + (cW - bound.left - bound.width));
        break;
      case 'top':
        obj.set('top', obj.top - bound.top);
        break;
      case 'center-v':
        obj.set('top', obj.top + (cH / 2) - (bound.top + bound.height / 2));
        break;
      case 'bottom':
        obj.set('top', obj.top + (cH - bound.top - bound.height));
        break;
    }

    obj.setCoords();
    canvas.renderAll();
    updatePositionFields(obj);
    saveHistory();
  }

  function distributeObjects(direction) {
    const activeObj = canvas.getActiveObject();
    if (!activeObj || activeObj.type !== 'activeSelection') return;

    const objs = activeObj._objects.slice();
    if (objs.length < 3) return;

    if (direction === 'h') {
      objs.sort((a, b) => a.left - b.left);
      const first = objs[0].left;
      const last = objs[objs.length - 1].left;
      const step = (last - first) / (objs.length - 1);
      objs.forEach((o, i) => {
        o.set('left', first + step * i);
        o.setCoords();
      });
    } else {
      objs.sort((a, b) => a.top - b.top);
      const first = objs[0].top;
      const last = objs[objs.length - 1].top;
      const step = (last - first) / (objs.length - 1);
      objs.forEach((o, i) => {
        o.set('top', first + step * i);
        o.setCoords();
      });
    }

    canvas.renderAll();
    saveHistory();
  }

  function bindAlignActions(obj) {
    document.querySelectorAll('[data-align-canvas]').forEach(btn => {
      btn.addEventListener('click', () => {
        alignToCanvas(obj, btn.dataset.alignCanvas);
      });
    });

    document.querySelectorAll('[data-distribute]').forEach(btn => {
      btn.addEventListener('click', () => {
        distributeObjects(btn.dataset.distribute);
      });
    });
  }

  // ----------------------------------------------------------------
  // LAYER ACTIONS
  // ----------------------------------------------------------------
  function bindLayerActions(obj) {
    document.querySelectorAll('[data-layer]').forEach(btn => {
      btn.addEventListener('click', () => {
        switch (btn.dataset.layer) {
          case 'front':
            canvas.bringToFront(obj);
            updateOverlays();
            break;
          case 'forward':
            canvas.bringForward(obj);
            updateOverlays();
            break;
          case 'backward':
            canvas.sendBackwards(obj);
            break;
          case 'back':
            canvas.sendToBack(obj);
            break;
        }
        canvas.renderAll();
        saveHistory();
      });
    });
  }

  // ----------------------------------------------------------------
  // COMMON ACTIONS (duplicate, delete)
  // ----------------------------------------------------------------
  function bindCommonActions(obj) {
    document.getElementById('prop-duplicate').addEventListener('click', () => {
      obj.clone(function (cloned) {
        cloned.set({ left: obj.left + 20, top: obj.top + 20 });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
        saveHistory();
        renderLayersList();
      });
    });

    document.getElementById('prop-delete').addEventListener('click', () => {
      canvas.remove(obj);
      canvas.discardActiveObject();
      canvas.renderAll();
      onSelectionClear();
      saveHistory();
      renderLayersList();
    });

    // Lock
    const lockBtn = document.getElementById('prop-lock');
    if (lockBtn) lockBtn.addEventListener('click', () => toggleLock(obj));

    // Group / Ungroup
    const groupBtn = document.getElementById('prop-group');
    if (groupBtn) groupBtn.addEventListener('click', groupSelection);
    const ungroupBtn = document.getElementById('prop-ungroup');
    if (ungroupBtn) ungroupBtn.addEventListener('click', ungroupSelection);

    // Copy / Paste style
    const csBtn = document.getElementById('prop-copy-style');
    if (csBtn) csBtn.addEventListener('click', () => { copyStyle(); onSelectionChange(); });
    const psBtn = document.getElementById('prop-paste-style');
    if (psBtn) psBtn.addEventListener('click', pasteStyle);

    // Remove background (image only)
    const bgBtn = document.getElementById('prop-remove-bg');
    if (bgBtn) bgBtn.addEventListener('click', () => removeBackgroundFromImage(obj));
  }

  // ----------------------------------------------------------------
  // UNDO / REDO
  // ----------------------------------------------------------------
  function saveHistory() {
    if (skipHistory) return;

    const json = JSON.stringify(canvas.toJSON());
    undoStack.push(json);
    if (undoStack.length > MAX_HISTORY) undoStack.shift();
    redoStack.length = 0;

    // Capture history thumbnail every 5th save
    historySnapshotCounter++;
    if (historySnapshotCounter % 5 === 0) {
      captureHistoryThumbnail();
    }
    renderLayersList();

    // Auto-save to cloud if connected
    if (currentDesignId && supabaseClient) {
      debouncedCloudSave();
    }
  }

  function undo() {
    if (undoStack.length <= 1) return;
    redoStack.push(undoStack.pop());
    restoreState(undoStack[undoStack.length - 1]);
  }

  function redo() {
    if (redoStack.length === 0) return;
    const state = redoStack.pop();
    undoStack.push(state);
    restoreState(state);
  }

  function restoreState(json) {
    skipHistory = true;
    canvas.loadFromJSON(JSON.parse(json), function () {
      canvas.renderAll();
      updateOverlays();
      skipHistory = false;
      renderLayersList();
    });
  }

  // ----------------------------------------------------------------
  // EXPORT
  // ----------------------------------------------------------------
  function exportPNG() {
    // Temporarily remove overlays
    const hadGrid = showGrid;
    const hadGuides = showGuides;
    removeOverlays();
    showGrid = false;
    showGuides = false;

    canvas.renderAll();

    // Export at 2x for high-res
    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 2,
      quality: 1
    });

    // Restore overlays
    showGrid = hadGrid;
    showGuides = hadGuides;
    updateOverlays();

    // Download
    const link = document.createElement('a');
    link.download = 'stationery-' + currentSize + '.png';
    link.href = dataURL;
    link.click();
  }

  function exportJSON() {
    saveCurrentPage();
    const json = canvas.toJSON();
    json._editorMeta = {
      canvasSize: currentSize,
      version: 2,
      exportedAt: new Date().toISOString(),
      pages: pages.map(p => ({ id: p.id, name: p.name, size: p.size, json: p.json })),
      currentPageIndex: currentPageIndex
    };

    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'stationery-' + currentSize + '.json';
    link.href = URL.createObjectURL(blob);
    link.click();

    // Also save to localStorage
    try {
      localStorage.setItem('weddingEditor_' + currentSize, JSON.stringify(json));
    } catch (e) {
      // localStorage may be full
    }
  }

  function loadFromJSON(json) {
    if (json._editorMeta && json._editorMeta.canvasSize) {
      const sizeKey = json._editorMeta.canvasSize;
      document.getElementById('canvas-size').value = sizeKey;
      setCanvasSize(sizeKey);
    }

    // Load pages if present
    if (json._editorMeta && json._editorMeta.pages) {
      pages = json._editorMeta.pages;
      currentPageIndex = json._editorMeta.currentPageIndex || 0;
      pageIdCounter = Math.max(...pages.map(p => p.id), 0);
      renderPageTabs();
    }

    skipHistory = true;
    canvas.loadFromJSON(json, function () {
      canvas.renderAll();
      updateOverlays();
      skipHistory = false;
      saveHistory();
      renderLayersList();
    });
  }

  // ----------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // ----------------------------------------------------------------
  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      const isMeta = e.metaKey || e.ctrlKey;

      // Don't intercept when editing text
      if (canvas.getActiveObject() && canvas.getActiveObject().isEditing) return;

      // Undo: Cmd+Z
      if (isMeta && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }

      // Redo: Cmd+Shift+Z
      if (isMeta && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
      }

      // Delete: Backspace or Delete
      if ((e.key === 'Backspace' || e.key === 'Delete') && canvas.getActiveObject()) {
        const obj = canvas.getActiveObject();
        if (obj && !obj.isEditing) {
          e.preventDefault();
          canvas.remove(obj);
          canvas.discardActiveObject();
          canvas.renderAll();
          onSelectionClear();
          saveHistory();
        }
      }

      // Duplicate: Cmd+D
      if (isMeta && e.key === 'd') {
        e.preventDefault();
        const obj = canvas.getActiveObject();
        if (obj) {
          obj.clone(function (cloned) {
            cloned.set({ left: obj.left + 20, top: obj.top + 20 });
            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.renderAll();
            saveHistory();
          });
        }
      }

      // Select all: Cmd+A
      if (isMeta && e.key === 'a') {
        e.preventDefault();
        const objs = canvas.getObjects().filter(o => o.selectable && !o.excludeFromExport && !o.locked);
        if (objs.length) {
          canvas.discardActiveObject();
          const sel = new fabric.ActiveSelection(objs, { canvas: canvas });
          canvas.setActiveObject(sel);
          canvas.renderAll();
        }
      }

      // Group: Cmd+G
      if (isMeta && !e.shiftKey && e.key === 'g') {
        e.preventDefault();
        groupSelection();
      }

      // Ungroup: Cmd+Shift+G
      if (isMeta && e.shiftKey && e.key === 'g') {
        e.preventDefault();
        ungroupSelection();
      }

      // Lock: Cmd+L
      if (isMeta && e.key === 'l') {
        e.preventDefault();
        const obj = canvas.getActiveObject();
        if (obj) toggleLock(obj);
      }

      // Copy style: Cmd+Alt+C
      if (isMeta && e.altKey && e.key === 'c') {
        e.preventDefault();
        copyStyle();
      }

      // Paste style: Cmd+Alt+V
      if (isMeta && e.altKey && e.key === 'v') {
        e.preventDefault();
        pasteStyle();
      }

      // Bring forward: Cmd+]
      if (isMeta && e.key === ']') {
        e.preventDefault();
        const obj = canvas.getActiveObject();
        if (obj) { canvas.bringForward(obj); updateOverlays(); canvas.renderAll(); saveHistory(); }
      }

      // Send backward: Cmd+[
      if (isMeta && e.key === '[') {
        e.preventDefault();
        const obj = canvas.getActiveObject();
        if (obj) { canvas.sendBackwards(obj); canvas.renderAll(); saveHistory(); }
      }

      // Arrow key nudge
      const obj = canvas.getActiveObject();
      if (obj && !obj.isEditing && !obj.locked && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        switch (e.key) {
          case 'ArrowUp':    obj.set('top', obj.top - step); break;
          case 'ArrowDown':  obj.set('top', obj.top + step); break;
          case 'ArrowLeft':  obj.set('left', obj.left - step); break;
          case 'ArrowRight': obj.set('left', obj.left + step); break;
        }
        obj.setCoords();
        canvas.renderAll();
        updatePositionFields(obj);
        // Debounced save
        clearTimeout(nudgeTimeout);
        nudgeTimeout = setTimeout(() => saveHistory(), 300);
      }

      // Escape: close context menu
      if (e.key === 'Escape') {
        hideContextMenu();
      }
    });
  }

  // ----------------------------------------------------------------
  // DRAG AND DROP
  // ----------------------------------------------------------------
  function initDragDrop() {
    const area = document.getElementById('canvas-area');
    const overlay = document.getElementById('drop-zone-overlay');
    let dragCounter = 0;

    area.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      if (overlay) overlay.classList.add('visible');
    });

    area.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        if (overlay) overlay.classList.remove('visible');
      }
    });

    area.addEventListener('dragover', (e) => e.preventDefault());

    area.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCounter = 0;
      if (overlay) overlay.classList.remove('visible');
      const files = e.dataTransfer.files;
      if (!files.length) return;
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
          reader.onload = (ev) => loadFromSVGCode(ev.target.result);
          reader.readAsText(file);
        } else if (file.type.startsWith('image/')) {
          reader.onload = (ev) => addImageFromDataURL(ev.target.result);
          reader.readAsDataURL(file);
        }
      });
    });
  }

  // ----------------------------------------------------------------
  // BACKGROUND REMOVAL
  // ----------------------------------------------------------------
  async function removeBackgroundFromImage(fabricImg) {
    if (!fabricImg || fabricImg.type !== 'image') return;

    const overlay = document.getElementById('bg-removal-overlay');
    const textEl = document.getElementById('bg-removal-text');

    if (overlay) overlay.classList.add('visible');
    if (textEl) textEl.textContent = bgRemovalModule ? 'Processing...' : 'Downloading model (first use)...';

    try {
      if (!bgRemovalModule) {
        bgRemovalModule = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm');
      }
      if (textEl) textEl.textContent = 'Removing background...';

      // Get image as blob
      const imgEl = fabricImg._element;
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = imgEl.naturalWidth || imgEl.width;
      tmpCanvas.height = imgEl.naturalHeight || imgEl.height;
      const ctx = tmpCanvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0);
      const blob = await new Promise(r => tmpCanvas.toBlob(r, 'image/png'));

      const result = await bgRemovalModule.removeBackground(blob);
      const url = URL.createObjectURL(result);

      fabricImg.setSrc(url, () => {
        canvas.renderAll();
        saveHistory();
      });
    } catch (err) {
      console.error('Background removal failed:', err);
      alert('Background removal failed. Check console for details.');
    } finally {
      if (overlay) overlay.classList.remove('visible');
    }
  }

  // ----------------------------------------------------------------
  // PAGES
  // ----------------------------------------------------------------
  function initPages() {
    // Create initial page
    pages = [{
      id: ++pageIdCounter,
      name: 'Page 1',
      size: currentSize,
      json: null
    }];
    currentPageIndex = 0;
    renderPageTabs();
  }

  function saveCurrentPage() {
    if (pages[currentPageIndex]) {
      pages[currentPageIndex].json = JSON.stringify(canvas.toJSON());
      pages[currentPageIndex].size = currentSize;
    }
  }

  function createPage() {
    saveCurrentPage();
    const newPage = {
      id: ++pageIdCounter,
      name: 'Page ' + pageIdCounter,
      size: currentSize,
      json: null
    };
    pages.push(newPage);
    currentPageIndex = pages.length - 1;

    // Clear canvas for new page
    canvas.clear();
    canvas.backgroundColor = PALETTE.cream;
    updateOverlays();
    canvas.renderAll();
    undoStack.length = 0;
    redoStack.length = 0;
    saveHistory();
    renderPageTabs();
    renderLayersList();
  }

  function switchPage(index) {
    if (index === currentPageIndex || index < 0 || index >= pages.length) return;
    saveCurrentPage();
    currentPageIndex = index;
    const page = pages[index];

    if (page.size !== currentSize) {
      currentSize = page.size;
      document.getElementById('canvas-size').value = currentSize;
      setCanvasSize(currentSize);
    }

    undoStack.length = 0;
    redoStack.length = 0;

    if (page.json) {
      skipHistory = true;
      canvas.loadFromJSON(JSON.parse(page.json), () => {
        canvas.renderAll();
        updateOverlays();
        skipHistory = false;
        saveHistory();
        renderLayersList();
      });
    } else {
      canvas.clear();
      canvas.backgroundColor = PALETTE.cream;
      updateOverlays();
      canvas.renderAll();
      saveHistory();
      renderLayersList();
    }
    renderPageTabs();
  }

  function deletePage(index) {
    if (pages.length <= 1) return;
    pages.splice(index, 1);
    if (currentPageIndex >= pages.length) currentPageIndex = pages.length - 1;
    switchPage(currentPageIndex);
  }

  function duplicatePage(index) {
    saveCurrentPage();
    const src = pages[index];
    const dup = {
      id: ++pageIdCounter,
      name: src.name + ' copy',
      size: src.size,
      json: src.json
    };
    pages.splice(index + 1, 0, dup);
    switchPage(index + 1);
  }

  function renderPageTabs() {
    const bar = document.getElementById('page-tabs-bar');
    if (!bar) return;
    bar.innerHTML = '';

    pages.forEach((page, i) => {
      const tab = document.createElement('div');
      tab.className = 'page-tab' + (i === currentPageIndex ? ' active' : '');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = page.name;
      nameSpan.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const newName = prompt('Page name:', page.name);
        if (newName) { page.name = newName; renderPageTabs(); }
      });
      tab.appendChild(nameSpan);

      if (pages.length > 1) {
        const close = document.createElement('span');
        close.className = 'page-tab-close';
        close.innerHTML = '&times;';
        close.addEventListener('click', (e) => { e.stopPropagation(); deletePage(i); });
        tab.appendChild(close);
      }

      tab.addEventListener('click', () => switchPage(i));
      bar.appendChild(tab);
    });

    const addBtn = document.createElement('div');
    addBtn.className = 'page-tab-add';
    addBtn.textContent = '+';
    addBtn.addEventListener('click', createPage);
    bar.appendChild(addBtn);
  }

  // ----------------------------------------------------------------
  // CONTEXT MENU
  // ----------------------------------------------------------------
  function initContextMenu() {
    const canvasArea = document.getElementById('canvas-area');
    canvasArea.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const target = canvas.findTarget(e);
      if (target && !target.excludeFromExport) {
        canvas.setActiveObject(target);
        canvas.renderAll();
      }
      showContextMenu(e);
    });

    document.addEventListener('click', hideContextMenu);
    document.addEventListener('scroll', hideContextMenu, true);
  }

  function showContextMenu(e) {
    const menu = document.getElementById('context-menu');
    if (!menu) return;
    const obj = canvas.getActiveObject();
    let items = '';

    if (obj) {
      items += `<div class="ctx-item" data-ctx="duplicate">Duplicate<span class="ctx-shortcut">Cmd+D</span></div>`;
      items += `<div class="ctx-item" data-ctx="delete">Delete<span class="ctx-shortcut">Del</span></div>`;
      items += `<div class="ctx-separator"></div>`;
      items += `<div class="ctx-item" data-ctx="lock">${obj.locked ? 'Unlock' : 'Lock'}<span class="ctx-shortcut">Cmd+L</span></div>`;
      items += `<div class="ctx-separator"></div>`;
      items += `<div class="ctx-item" data-ctx="front">Bring to Front</div>`;
      items += `<div class="ctx-item" data-ctx="forward">Bring Forward<span class="ctx-shortcut">Cmd+]</span></div>`;
      items += `<div class="ctx-item" data-ctx="backward">Send Backward<span class="ctx-shortcut">Cmd+[</span></div>`;
      items += `<div class="ctx-item" data-ctx="back">Send to Back</div>`;
      items += `<div class="ctx-separator"></div>`;
      items += `<div class="ctx-item" data-ctx="copy-style">Copy Style<span class="ctx-shortcut">Cmd+Alt+C</span></div>`;
      if (copiedStyle) {
        items += `<div class="ctx-item" data-ctx="paste-style">Paste Style<span class="ctx-shortcut">Cmd+Alt+V</span></div>`;
      }
      if (obj.type === 'activeSelection') {
        items += `<div class="ctx-separator"></div>`;
        items += `<div class="ctx-item" data-ctx="group">Group<span class="ctx-shortcut">Cmd+G</span></div>`;
      }
      if (obj.type === 'group') {
        items += `<div class="ctx-separator"></div>`;
        items += `<div class="ctx-item" data-ctx="ungroup">Ungroup<span class="ctx-shortcut">Cmd+Shift+G</span></div>`;
      }
    } else {
      items += `<div class="ctx-item" data-ctx="select-all">Select All<span class="ctx-shortcut">Cmd+A</span></div>`;
    }

    menu.innerHTML = items;
    menu.classList.add('visible');

    // Position
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight);
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    // Bind actions
    menu.querySelectorAll('.ctx-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.ctx;
        const obj = canvas.getActiveObject();
        switch (action) {
          case 'duplicate':
            if (obj) obj.clone(c => { c.set({ left: obj.left + 20, top: obj.top + 20 }); canvas.add(c); canvas.setActiveObject(c); canvas.renderAll(); saveHistory(); });
            break;
          case 'delete':
            if (obj) { canvas.remove(obj); canvas.discardActiveObject(); canvas.renderAll(); onSelectionClear(); saveHistory(); }
            break;
          case 'lock': if (obj) toggleLock(obj); break;
          case 'front': if (obj) { canvas.bringToFront(obj); updateOverlays(); canvas.renderAll(); saveHistory(); } break;
          case 'forward': if (obj) { canvas.bringForward(obj); updateOverlays(); canvas.renderAll(); saveHistory(); } break;
          case 'backward': if (obj) { canvas.sendBackwards(obj); canvas.renderAll(); saveHistory(); } break;
          case 'back': if (obj) { canvas.sendToBack(obj); canvas.renderAll(); saveHistory(); } break;
          case 'copy-style': copyStyle(); break;
          case 'paste-style': pasteStyle(); break;
          case 'group': groupSelection(); break;
          case 'ungroup': ungroupSelection(); break;
          case 'select-all':
            const objs = canvas.getObjects().filter(o => o.selectable && !o.excludeFromExport && !o.locked);
            if (objs.length) { canvas.discardActiveObject(); canvas.setActiveObject(new fabric.ActiveSelection(objs, { canvas })); canvas.renderAll(); }
            break;
        }
        hideContextMenu();
      });
    });
  }

  function hideContextMenu() {
    const menu = document.getElementById('context-menu');
    if (menu) menu.classList.remove('visible');
  }

  // ----------------------------------------------------------------
  // LAYERS PANEL
  // ----------------------------------------------------------------
  function renderLayersList() {
    const list = document.getElementById('layers-list');
    if (!list) return;

    const objects = canvas.getObjects().filter(o => !o.excludeFromExport && !o._isSmartGuide);
    const activeObj = canvas.getActiveObject();

    list.innerHTML = '';

    // Render in reverse order (top layer first)
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      const isActive = activeObj === obj;
      const item = document.createElement('div');
      item.className = 'layer-item' + (isActive ? ' active' : '');

      const icon = getLayerIcon(obj);
      const name = getLayerLabel(obj);

      item.innerHTML = `
        <svg class="layer-item-icon" viewBox="0 0 24 24">${icon}</svg>
        <span class="layer-item-name">${name}</span>
        <button class="layer-item-action ${!obj.visible ? 'hidden' : ''}" data-layer-action="visibility" title="Toggle visibility">
          <svg viewBox="0 0 24 24">${obj.visible !== false ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'}</svg>
        </button>
        <button class="layer-item-action ${obj.locked ? 'locked' : ''}" data-layer-action="lock" title="Toggle lock">
          <svg viewBox="0 0 24 24">${obj.locked ? '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' : '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.83-1"/>'}</svg>
        </button>
      `;

      // Click to select
      item.addEventListener('click', (e) => {
        if (e.target.closest('[data-layer-action]')) return;
        if (obj.locked) return;
        canvas.setActiveObject(obj);
        canvas.renderAll();
      });

      // Visibility toggle
      item.querySelector('[data-layer-action="visibility"]').addEventListener('click', () => {
        obj.visible = obj.visible === false ? true : false;
        canvas.renderAll();
        renderLayersList();
      });

      // Lock toggle
      item.querySelector('[data-layer-action="lock"]').addEventListener('click', () => {
        toggleLock(obj);
      });

      list.appendChild(item);
    }
  }

  function getLayerIcon(obj) {
    switch (obj.type) {
      case 'i-text': case 'text': case 'textbox':
        return '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>';
      case 'rect':
        return '<rect x="3" y="3" width="18" height="18" rx="2"/>';
      case 'circle':
        return '<circle cx="12" cy="12" r="9"/>';
      case 'line':
        return '<line x1="4" y1="20" x2="20" y2="4"/>';
      case 'image':
        return '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>';
      case 'group':
        return '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>';
      default:
        return '<rect x="3" y="3" width="18" height="18" rx="2"/>';
    }
  }

  function getLayerLabel(obj) {
    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
      return (obj.text || '').substring(0, 20) || 'Text';
    }
    if (obj.type === 'group') return 'Group (' + (obj._objects ? obj._objects.length : 0) + ')';
    if (obj.type === 'image') return 'Image';
    return obj.type.charAt(0).toUpperCase() + obj.type.slice(1);
  }

  // ----------------------------------------------------------------
  // HISTORY PANEL
  // ----------------------------------------------------------------
  function captureHistoryThumbnail() {
    try {
      const hadGrid = showGrid;
      const hadGuides = showGuides;
      const savedSmartGuides = activeSmartGuides.slice();
      removeOverlays();
      showGrid = false;
      showGuides = false;
      hideSmartGuides();

      const dataURL = canvas.toDataURL({ format: 'png', multiplier: 0.15, quality: 0.6 });

      showGrid = hadGrid;
      showGuides = hadGuides;
      updateOverlays();

      historyThumbnails.push({
        dataURL,
        time: new Date().toLocaleTimeString(),
        stateIndex: undoStack.length - 1
      });

      if (historyThumbnails.length > 20) historyThumbnails.shift();
      renderHistoryPanel();
    } catch (e) {
      // Ignore capture errors
    }
  }

  function renderHistoryPanel() {
    const list = document.getElementById('history-list');
    if (!list) return;

    list.innerHTML = '';
    historyThumbnails.slice().reverse().forEach((entry, idx) => {
      const item = document.createElement('div');
      item.className = 'history-item' + (idx === 0 ? ' active' : '');
      item.innerHTML = `
        <div class="history-thumb"><img src="${entry.dataURL}" alt="Snapshot"></div>
        <div class="history-time">${entry.time}</div>
      `;
      item.addEventListener('click', () => {
        if (entry.stateIndex >= 0 && entry.stateIndex < undoStack.length) {
          restoreState(undoStack[entry.stateIndex]);
        }
      });
      list.appendChild(item);
    });
  }

  // ----------------------------------------------------------------
  // RULERS
  // ----------------------------------------------------------------
  function toggleRulers() {
    const top = document.getElementById('ruler-top');
    const left = document.getElementById('ruler-left');
    const corner = document.getElementById('ruler-corner');

    if (top) top.classList.toggle('visible', showRulers);
    if (left) left.classList.toggle('visible', showRulers);
    if (corner) corner.classList.toggle('visible', showRulers);

    if (showRulers) {
      renderRulers();
      // Track mouse for cursor lines
      const viewport = document.getElementById('canvas-viewport');
      if (viewport) {
        viewport.addEventListener('mousemove', updateRulerCursor);
      }
    }
  }

  function renderRulers() {
    const topRuler = document.getElementById('ruler-top');
    const leftRuler = document.getElementById('ruler-left');
    if (!topRuler || !leftRuler) return;

    topRuler.innerHTML = '';
    leftRuler.innerHTML = '';

    const step = DPI * 0.25 * zoomLevel;
    const labelStep = DPI * zoomLevel;
    const cW = canvas.getWidth() * zoomLevel;
    const cH = canvas.getHeight() * zoomLevel;

    // Get canvas position relative to viewport
    const wrapper = document.getElementById('canvas-wrapper');
    const viewport = document.getElementById('canvas-viewport');
    if (!wrapper || !viewport) return;

    const wrapRect = wrapper.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();
    const offsetX = wrapRect.left - viewRect.left;
    const offsetY = wrapRect.top - viewRect.top;

    // Top ruler ticks
    for (let px = 0; px < cW; px += step) {
      const x = offsetX + px;
      const inch = px / (DPI * zoomLevel);
      const isLabel = Math.abs(inch - Math.round(inch)) < 0.01;

      const tick = document.createElement('div');
      tick.className = 'ruler-tick';
      tick.style.cssText = `left:${x}px;top:${isLabel ? 8 : 14}px;width:1px;height:${isLabel ? 12 : 6}px;`;
      topRuler.appendChild(tick);

      if (isLabel) {
        const label = document.createElement('div');
        label.className = 'ruler-label';
        label.style.cssText = `left:${x + 2}px;top:1px;`;
        label.textContent = Math.round(inch);
        topRuler.appendChild(label);
      }
    }

    // Left ruler ticks
    for (let py = 0; py < cH; py += step) {
      const y = offsetY + py;
      const inch = py / (DPI * zoomLevel);
      const isLabel = Math.abs(inch - Math.round(inch)) < 0.01;

      const tick = document.createElement('div');
      tick.className = 'ruler-tick';
      tick.style.cssText = `top:${y}px;left:${isLabel ? 8 : 14}px;height:1px;width:${isLabel ? 12 : 6}px;`;
      leftRuler.appendChild(tick);

      if (isLabel) {
        const label = document.createElement('div');
        label.className = 'ruler-label';
        label.style.cssText = `top:${y + 2}px;left:1px;`;
        label.textContent = Math.round(inch);
        leftRuler.appendChild(label);
      }
    }

    // Add cursor lines
    const cursorH = document.createElement('div');
    cursorH.className = 'ruler-cursor';
    cursorH.id = 'ruler-cursor-h';
    cursorH.style.cssText = 'width:1px;height:100%;top:0;display:none;';
    topRuler.appendChild(cursorH);

    const cursorV = document.createElement('div');
    cursorV.className = 'ruler-cursor';
    cursorV.id = 'ruler-cursor-v';
    cursorV.style.cssText = 'height:1px;width:100%;left:0;display:none;';
    leftRuler.appendChild(cursorV);
  }

  function updateRulerCursor(e) {
    const viewport = document.getElementById('canvas-viewport');
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cursorH = document.getElementById('ruler-cursor-h');
    const cursorV = document.getElementById('ruler-cursor-v');
    if (cursorH) { cursorH.style.left = x + 'px'; cursorH.style.display = 'block'; }
    if (cursorV) { cursorV.style.top = y + 'px'; cursorV.style.display = 'block'; }
  }

  // ----------------------------------------------------------------
  // ZOOM TO SELECTION
  // ----------------------------------------------------------------
  function zoomToObject(obj) {
    if (!obj) return;
    const bound = obj.getBoundingRect(true);
    const area = document.getElementById('canvas-viewport');
    if (!area) return;

    const areaW = area.clientWidth;
    const areaH = area.clientHeight;
    const padding = 1.2; // 20% padding

    const scaleX = areaW / (bound.width * padding);
    const scaleY = areaH / (bound.height * padding);
    const targetZoom = Math.min(scaleX, scaleY, 3);

    zoomLevel = targetZoom;
    applyZoom();
    if (showRulers) renderRulers();
  }

  // ----------------------------------------------------------------
  // PDF EXPORT
  // ----------------------------------------------------------------
  function exportPDF() {
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
      alert('jsPDF not loaded');
      return;
    }
    const { jsPDF } = window.jspdf;

    // Save overlays state
    const hadGrid = showGrid;
    const hadGuides = showGuides;
    removeOverlays();
    showGrid = false;
    showGuides = false;
    hideSmartGuides();
    canvas.discardActiveObject();
    canvas.renderAll();

    const size = CANVAS_SIZES[currentSize];
    const bleed = 0.125; // inches
    const totalW = size.w + bleed * 2;
    const totalH = size.h + bleed * 2;
    const orientation = totalW > totalH ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
      orientation,
      unit: 'in',
      format: [totalW, totalH]
    });

    // Render canvas at 300 DPI
    const multiplier = 300 / DPI;
    const dataURL = canvas.toDataURL({ format: 'png', multiplier, quality: 1 });

    // Place image with bleed offset
    pdf.addImage(dataURL, 'PNG', bleed, bleed, size.w, size.h);

    // Draw crop marks
    drawCropMarks(pdf, totalW, totalH, bleed);

    // Restore overlays
    showGrid = hadGrid;
    showGuides = hadGuides;
    updateOverlays();

    pdf.save('stationery-' + currentSize + '.pdf');
  }

  function drawCropMarks(pdf, totalW, totalH, bleed) {
    const markLen = 0.25;
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.005);

    // Top-left
    pdf.line(0, bleed, markLen, bleed);
    pdf.line(bleed, 0, bleed, markLen);
    // Top-right
    pdf.line(totalW - markLen, bleed, totalW, bleed);
    pdf.line(totalW - bleed, 0, totalW - bleed, markLen);
    // Bottom-left
    pdf.line(0, totalH - bleed, markLen, totalH - bleed);
    pdf.line(bleed, totalH - markLen, bleed, totalH);
    // Bottom-right
    pdf.line(totalW - markLen, totalH - bleed, totalW, totalH - bleed);
    pdf.line(totalW - bleed, totalH - markLen, totalW - bleed, totalH);
  }

  // ----------------------------------------------------------------
  // SVG EXPORT
  // ----------------------------------------------------------------
  function exportSVG() {
    const hadGrid = showGrid;
    const hadGuides = showGuides;
    removeOverlays();
    showGrid = false;
    showGuides = false;
    hideSmartGuides();
    canvas.discardActiveObject();
    canvas.renderAll();

    const svgString = canvas.toSVG();

    showGrid = hadGrid;
    showGuides = hadGuides;
    updateOverlays();

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = 'stationery-' + currentSize + '.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  // ----------------------------------------------------------------
  // INIT
  // ----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', init);

})();
