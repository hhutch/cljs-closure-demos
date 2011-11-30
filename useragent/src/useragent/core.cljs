(ns useragent
  (:require
    [goog.array :as goog-array]
    [goog.dom :as dom]
    [goog.dom.classes :as dom-classes]
    [goog.userAgent :as goog-ua]
    [goog.userAgent.adobeReader :as goog-ua-ar]
    [goog.userAgent.flash :as goog-ua-flash]
    [goog.userAgent.iphoto :as goog-ua-iphoto]
    [goog.userAgent.jscript :as goog-ua-js]
    [goog.userAgent.picasa :as goog-ua-pc]
    [goog.userAgent.product :as goog-ua-pr]
    [goog.userAgent.product.isVersion :as goog-ua-prv]))

;; stolen from http://mmcgrana.github.com/2011/09/clojurescript-nodejs.html
(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
   other ClojureScript colls into JavaScript arrays, and ClojureScript
   keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (apply array (map clj->js x))
    :else x))

;(comment
;   * Adds a name/value row to the table.
;   * @param {Element} parent The table body to append the row to
;   * @param {string} name The name of the property
;   * @param {string|boolean} value The value to display
;)
(defn add-value 
  [parent name value] 
  (let [row (dom/createElement "tr")
        name-cell (dom/createDom "th" nil name)
        value-cell (dom/createElement "td") ]
    (dom/appendChild parent row)
    (dom/appendChild row name-cell)
    (dom/appendChild row value-cell)
    ;(if (or (true? value) (false? value))
    (if (goog.isBoolean. value)
        (let [value-truthy (if (true? value) "yes" "no")]
            (dom/setTextContent value-cell value-truthy)
            (.. goog.dom classes (set value-cell value-truthy)) )
        (do (dom/setTextContent value-cell value)
            (if (not value)
                (.. goog.dom classes (set value-cell "no")) )))))

;(comment
;   * Adds a list of user-agent properties and their values to the output table.
;   * @param {Element} parent The table body to append new rows to
;   * @param {string} title The header for this table section
;   * @param {Object} ns The Closure namespace to read properties from
;   * @param {Array.<string>} A list of properties to read from that namespace
;)  
(defn add-section 
  [parent title cl-ns properties] 
  (dom/appendChild parent (dom/createDom "tr" nil
                            (dom/createDom "th"
                              (clj->js {"colspan" 2 "class" "section"})
                              title)))

  (goog-array/forEach properties
    (fn [p] (add-value parent (. p (toLowerCase)) cl-ns[p]))) )

(defn ^:export setup []
  (let [platform-fields (clj->js [ "LINUX" "MAC" "WINDOWS" "X11" "PLATFORM" ]) 
        renderer-fields (clj->js [ "GECKO" "IE" "OPERA" "WEBKIT" "VERSION" ])
        product-fields (clj->js [ "ANDROID" "CAMINO" "CHROME" "FIREFOX" "IE" "IPAD" "IPHONE" "OPERA" "SAFARI" "VERSION" ])
        ;; Public members in goog.userAgent.flash
        flash-fields (clj->js [ "HAS_FLASH" "VERSION" ])
        ;; Public members in goog.userAgent.picasa
        picasa-fields (clj->js [ "HAS_PICASA" "VERSION" ])
        ;; Public members in goog.userAgent.iphoto
        iphoto-fields (clj->js [ "HAS_IPHOTO" "VERSION" ])
        ;; Public members in goog.userAgent.jscript
        jscript-fields (clj->js [ "HAS_JSCRIPT" "VERSION" ])
        ;; Public members in goog.userAgent.adobeReader
        adobe-reader-fields (clj->js [ "HAS_READER" "SILENT_PRINT" "VERSION" ]) 
        browser (dom/getElement "browserFields")
        features (dom/getElement "featureFields") ]

    (add-section browser "Hardware Platform" goog.userAgent platform-fields)
    (add-section browser "Renderer" goog.userAgent renderer-fields)
    (add-section browser "Product" goog.userAgent.product product-fields)

    (add-section features "Adobe Reader Detection" goog.userAgent.adobeReader adobeReader-fields)
    (add-section features "Flash Plugin" goog.userAgent.flash flash-fields)
    (add-section features "iPhoto Detection" goog.userAgent.iphoto iphoto-fields)
    (add-section features "Microsoft JScript" goog.userAgent.jscript jscript-fields)
    (add-section features "Picasa Detection" goog.userAgent.picasa picasa-fields)
  )
)
