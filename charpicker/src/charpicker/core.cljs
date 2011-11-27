(ns charpicker
  (:require
    [clojure.browser.dom :as dom]
    [goog.events :as goog-events]
    [goog.ui.CharPicker :as char-picker]
    [goog.i18n.CharPickerData :as char-picker-data]))

(defn ^:export setup []
  (let [picker (goog.ui.CharPicker. (goog.i18n.CharPickerData. (array ["\uD869\uDED6" "a" "b" "c"]) 10 1))
        el (dom/get-element "char-picker")
        selection-action (fn [] (. goog.dom (setTextContent (dom/get-element "p1_value") (. picker (getSelectedChar)))))]
    (. picker (decorate el))
    (.listen goog.events picker
             "action" (fn [e] (selection-action)))
    (.listen goog.events (dom/get-element "picker-button")
             goog.events.EventType.CLICK
             (fn [e] (. picker (dispose)))) ))
