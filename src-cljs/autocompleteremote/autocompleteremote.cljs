(ns autocompleteremote
  (:require
   [clojure.browser.dom :refer [get-element]]
   [goog.ui.ac.Remote :as ac-remote]))

(defn ^:export setup []
  (let [input (get-element "txtInput")
        ac (goog.ui.ac.Remote. "js/autocompleteremotedata.js" input)]))
