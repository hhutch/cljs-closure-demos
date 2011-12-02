(ns autocompleteremote
  (:require
    [goog.dom :as dom]
    [goog.ui.AutoComplete.Remote :as ac-remote]))

(defn ^:export setup []
  (let [input (dom/getElement "txtInput")
        ac (goog.ui.AutoComplete.Remote. "autocompleteremotedata.js" input)] ))
