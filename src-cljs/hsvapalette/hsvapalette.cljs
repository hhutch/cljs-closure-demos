(ns hsvapalette
  (:require
      [goog.events :as goog-events]
      [goog.ui.Component.EventType :as co-event-type]
      [goog.ui.HsvaPalette :as hsva-palette]))

(defn ^:export setup []
  (let [p (goog.ui.HsvaPalette.)
        p-small (goog.ui.HsvaPalette. nil nil nil "goog-hsva-palette-sm")
        link-colors (fn [e] 
                      (.. e -target -other (setColorRgbaHex 
                                            (.getColorRgbaHex (.-target e)))))]
    (. p (render))
    (. p-small (render))
    (set! (.-other p) p-small)
    (set! (.-other p-small) p)

    (doto goog.events
      (.listen p
               goog.ui.Component.EventType.ACTION
               link-colors)
      (.listen p-small
               goog.ui.Component.EventType.ACTION
               link-colors))
 ))
