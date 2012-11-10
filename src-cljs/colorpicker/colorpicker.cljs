(ns colorpicker
  (:require
    [goog.dom :as dom]
    [goog.ui.ColorPicker :as color-picker]))

(defn ^:export setup []
  (let [picker02 (. goog.ui.ColorPicker (createSimpleColorGrid))]
    (. picker02 (render (dom/getElement "colorpicker02")))
    (.listen goog.events
             picker02
             goog.ui.ColorPicker.EventType.CHANGE
             (fn [e]
               (let [color (or (.. e -target getSelectedColor)
                               "#000000")
                     el (dom/getElement "picker02message")]
                 (set! (.-innerHTML el) (str "You selected: " color))
                 (set! (.. el -style -color) color) )))
    (.listen goog.events (dom/getWindow)
             "unload"
             (fn [e] (. goog.events (removeAll)))) ))
