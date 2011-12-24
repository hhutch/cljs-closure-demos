(ns autocompleterichremote
  (:require
    [goog.dom :as dom]
    [goog.array :as goog-array]
    [goog.ui.AutoComplete.RichRemote :as rich-remote]))

(defn make-rich-row
  [item item-type item-class-name]
  (set! (.type item) item-type)
  (set! (.render item)
        (fn [node token]
          (let [node-dom (. goog.dom (getDomHelper node))
                type-node (. dom (createDom "span" item-class-name))
                name-node (. node-dom (createDom "span"))]
            (doto node-dom 
              (.appendChild type-node (. node-dom (createTextNode item-type)))
              (.appendChild type-node (. node-dom (createTextNode (.name item))))
              (.appendChild node type-node)
              (.appendChild node name-node) ))))
  (set! (.select item)
        (fn [target]
          (let [wikipedia (dom/getElement "wikipedia")]
            (set! (.value target) (.name item))
            (set! (.src wikipedia) (.url item)))))
  item)
  
(defn ^:export setup []
  (let [apple (fn [item] (make-rich-row item 'Apple 'apple))
        citrus (fn [item] (make-rich-row item 'Citrus 'citrus))
        berry (fn [item] (make-rich-row item 'Berry 'berry))
        input (dom/getElement "txtInput")
        wikipedia (dom/getElement "wikipedia")
        ac (goog.ui.AutoComplete.RichRemote. "autocompleterichremotedata.js" input) 
        filter-out-berries (fn [rows] (goog.array.filter. rows (fn [item] (!= (.type item) "Berry"))))
        set-filter (fn [] (let [checkbox (dom/getElement "berryAllergy")]
                            (if (.checked checkbox) 
                                (. ac (setRowFilter filter-out-berries))
                                (. ac (setRowFilter)))))
        set-highlighting (fn [] (let [checkbox (dom/getElement "setHighlighting")]
                                  (. ac (setUseStandardHighlighting (.checked checkbox))))) ]
    (set-filter)
    (set-highlighting) ))
