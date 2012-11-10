(ns colorcontrast
  (:require
    [goog.dom :as dom]
    [goog.events :as goog-events]
    [goog.color :as goog-color]))

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

(defn black-or-white []
   (let [color-input (dom/getElement "color")
         preview-element (dom/getElement "preview")
         bg-rgb (. goog.color (hexToRgbStyle (str "#" (.-value color-input))))
         bg-rgb-arr (. goog.color (parseRgb bg-rgb))
         best-color (. goog.color (highContrast bg-rgb-arr (clj->js [[0 0 0] [255 255 255]])))
         best-color-hex (. goog.color (rgbArrayToHex best-color)) ]
     (. js/console (info (str best-color-hex " wins on sum")))
     (set! (.. preview-element 
               -style
               -backgroundColor) 
           (str "#" (.-value color-input)))
     (set! (.. preview-element
               -style
               -color) 
           best-color-hex) ))

(defn ^:export setup []
 (.listen goog.events
          (dom/getElement "submit")
          goog.events.EventType.CLICK
          (fn [e] (black-or-white))) 
)
