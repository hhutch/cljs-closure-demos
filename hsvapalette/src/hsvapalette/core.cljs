(ns hsvapalette
  (:require
      [goog.events :as goog-events]
      [goog.ui.Component.EventType :as co-event-type]
      [goog.ui.HsvaPalette :as hsva-palette]))

(defn ^:export setup []
  (let [p (goog.ui.HsvaPalette.)
        p-small (goog.ui.HsvaPalette. nil nil nil "goog-hsva-palette-sm")
        link-colors (fn [e] 
                      (.. e target other (setColorRgbaHex 
                                           (. e.target (getColorRgbaHex)))))]
    (. p (render))
    (. p-small (render))
    (set! (.other p) p-small)
    (set! (.other p-small) p)

    (.listen goog.events 
             p
             goog.ui.Component.EventType.ACTION
             link-colors)
    (.listen goog.events 
             p-small
             goog.ui.Component.EventType.ACTION
             link-colors) ))
