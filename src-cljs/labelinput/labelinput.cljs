(ns labelinput
  (:require
    [goog.dom :as dom]
    [goog.ui.LabelInput :as label-input]))

(defn ^:export setup []
  (let [li1 (goog.ui.LabelInput.)
        li2 (goog.ui.LabelInput. "Search, add, or invite 2")
        el (. li2 (render (dom/getElement "d")))]
    (. li1 (decorate (dom/getElement "i")))
    (set! (.. li2 getElement -name) "dynamic")))
