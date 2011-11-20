(ns autocompletebasic
  (:require
    [clojure.browser.dom :as dom]
    [goog.ui.AutoComplete :as auto-complete]
    [goog.ui.AutoComplete.Basic :as ac-basic]))

(defn ^:export setup []
  (let [tcMovies (apply array ["Mission Impossible" "Top Gun" "Jerry McGuire"
                               "Rain Man" "Days of Thunder" "Risky Business"
                               "Interview With The Vampire" "Eyes Wide Shut" "Far And Away"
                               "Jerry Maguire" "The Firm" "Cocktail"
                               "A Few Good Men" "Legend" "Taps"
                               "The Outsiders" "Losin' It" "Endless Love"
                               "The Color Of Money" "All The Right Moves" "Minority Report"
                               "Magnolia" "Mission Impossible 2" "Mission Impossible 3"
                               "Vanilla Sky" "Ghost Soldiers" "Few Good Men A"
                               "Color of Money The" "Firm The" "Mission Impossible II"
                               "Outsiders The" "Young Guns" "Top Gun DVD"
                               "Days of Thunder DVD" "Coctail" "Mission Impossible DVD"
                               "Fallen Angels Vol 1" "Don't Look at Me" "Young Guns uncredited"])
        txtInput1 (dom/get-element "txtInput1")]
    (def ac1 (goog.ui.AutoComplete.Basic. tcMovies (dom/get-element "txtInput1") false))
    (def ac2 (goog.ui.AutoComplete.Basic. tcMovies (dom/get-element "txtInput2") true)) ))
