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
    { name: 'Zodiak', cat: 'serif' }
  ];

  const ILLUST_CATEGORIES = ['moose', 'couple', 'toronto', 'decor', 'border'];

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

  // ----------------------------------------------------------------
  // INITIALIZATION
  // ----------------------------------------------------------------
  function init() {
    initCanvas();
    initSidebar();
    initToolbar();
    initProperties();
    initKeyboard();
    fitCanvasToView();
    saveHistory();
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
    canvas.on('object:modified', () => saveHistory());
    canvas.on('selection:created', onSelectionChange);
    canvas.on('selection:updated', onSelectionChange);
    canvas.on('selection:cleared', onSelectionClear);
    canvas.on('text:changed', () => saveHistory());

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
    const cW = canvas.getWidth();
    const cH = canvas.getHeight();
    const snapThreshold = 6;

    const objCenter = obj.getCenterPoint();
    const canvasCenter = { x: cW / 2, y: cH / 2 };

    // Snap to center
    if (Math.abs(objCenter.x - canvasCenter.x) < snapThreshold) {
      obj.set({ left: canvasCenter.x - (obj.getScaledWidth() / 2) + (obj.width * obj.scaleX / 2) - obj.width * obj.scaleX / 2 + canvasCenter.x - objCenter.x + obj.left });
      // Simpler: set center
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
      });
    });

    initIllustrationBrowser();
    initTextPresets();
    initShapeButtons();
    initPresets();
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
        renderIllustGrid(cat);
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
        fabric.Image.fromURL(ev.target.result, function (img) {
          // Scale to fit canvas
          const maxDim = Math.max(img.width, img.height);
          const canvasMax = Math.min(canvas.getWidth(), canvas.getHeight()) * 0.5;
          if (maxDim > canvasMax) {
            const scale = canvasMax / maxDim;
            img.scaleX = scale;
            img.scaleY = scale;
          }
          img.set({
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            originX: 'center',
            originY: 'center'
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          saveHistory();
        });
      };
      reader.readAsDataURL(file);
      e.target.value = '';
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
  }

  function onSelectionClear() {
    document.getElementById('props-empty').style.display = 'block';
    document.getElementById('props-dynamic').style.display = 'none';
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
          <input type="color" class="prop-color-input" id="prop-text-color-custom" value="${obj.fill || '#1B2438'}">
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
        <div class="prop-label">Opacity</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-opacity" min="0" max="1" step="0.05" value="${obj.opacity}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.opacity * 100)}%</span>
        </div>
      </div>

      ${renderLayerHTML()}

      <div class="prop-actions">
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
    document.querySelectorAll('#prop-text-colors .prop-color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        obj.set('fill', sw.dataset.color);
        canvas.renderAll();
        saveHistory();
        onSelectionChange();
      });
    });

    document.getElementById('prop-text-color-custom').addEventListener('input', (e) => {
      obj.set('fill', e.target.value);
      canvas.renderAll();
    });
    document.getElementById('prop-text-color-custom').addEventListener('change', () => saveHistory());

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

    // Bind opacity
    const opSlider = document.getElementById('prop-opacity');
    opSlider.addEventListener('input', (e) => {
      obj.set('opacity', parseFloat(e.target.value));
      opSlider.nextElementSibling.textContent = Math.round(parseFloat(e.target.value) * 100) + '%';
      canvas.renderAll();
    });
    opSlider.addEventListener('change', () => saveHistory());

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
        <div class="pos-grid">
          <div class="pos-field">
            <span class="pos-label">W</span>
            <input type="number" class="pos-input" id="prop-width" value="${Math.round(obj.getScaledWidth())}">
          </div>
          <div class="pos-field">
            <span class="pos-label">H</span>
            <input type="number" class="pos-input" id="prop-height" value="${Math.round(obj.getScaledHeight())}">
          </div>
        </div>
      </div>

      ${hasStroke ? `
      <div class="prop-group">
        <div class="prop-label">Stroke Color</div>
        <div class="prop-color-row" id="prop-stroke-colors">
          ${Object.entries(PALETTE).map(([name, hex]) =>
            `<div class="prop-color-swatch ${obj.stroke === hex ? 'active' : ''}" style="background: ${hex}; ${hex === '#FFFFFF' ? 'border: 1px solid #444;' : ''}" data-color="${hex}" title="${name}"></div>`
          ).join('')}
          <input type="color" class="prop-color-input" id="prop-stroke-custom" value="${obj.stroke || '#1B2438'}">
        </div>
      </div>
      ` : ''}

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
        <div class="prop-label">Opacity</div>
        <div class="prop-row">
          <input type="range" class="prop-slider" id="prop-opacity" min="0" max="1" step="0.05" value="${obj.opacity}">
          <span style="font-size: 11px; color: var(--ed-text-dim); min-width: 30px; text-align: right;">${Math.round(obj.opacity * 100)}%</span>
        </div>
      </div>

      ${renderLayerHTML()}

      <div class="prop-actions">
        <button class="prop-action-btn" id="prop-duplicate">Duplicate</button>
        <button class="prop-action-btn danger" id="prop-delete">Delete</button>
      </div>
    `;

    // Bind position & size
    bindPositionInputs(obj);
    bindSizeInputs(obj);

    // Bind stroke colors
    const strokeColors = document.getElementById('prop-stroke-colors');
    if (strokeColors) {
      strokeColors.querySelectorAll('.prop-color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
          setObjectColor(obj, 'stroke', sw.dataset.color);
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

    bindAlignActions(obj);
    bindLayerActions(obj);
    bindCommonActions(obj);
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
          // Maintain aspect ratio
          obj.scaleY = obj.scaleX * ratio;
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
          // Maintain aspect ratio
          obj.scaleX = obj.scaleY * ratio;
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
        cloned.set({
          left: obj.left + 20,
          top: obj.top + 20
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
        saveHistory();
      });
    });

    document.getElementById('prop-delete').addEventListener('click', () => {
      canvas.remove(obj);
      canvas.discardActiveObject();
      canvas.renderAll();
      onSelectionClear();
      saveHistory();
    });
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
    const json = canvas.toJSON();
    json._editorMeta = {
      canvasSize: currentSize,
      version: 1,
      exportedAt: new Date().toISOString()
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

    skipHistory = true;
    canvas.loadFromJSON(json, function () {
      canvas.renderAll();
      updateOverlays();
      skipHistory = false;
      saveHistory();
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
        const objs = canvas.getObjects().filter(o => o.selectable && !o.excludeFromExport);
        if (objs.length) {
          canvas.discardActiveObject();
          const sel = new fabric.ActiveSelection(objs, { canvas: canvas });
          canvas.setActiveObject(sel);
          canvas.renderAll();
        }
      }
    });
  }

  // ----------------------------------------------------------------
  // INIT
  // ----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', init);

})();
