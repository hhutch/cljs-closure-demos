(ns progressbar
  (:require
   [goog.dom :as dom]
   [goog.ui.Component :as goog-component]
   [goog.ui.ProgressBar :as goog-progressbar]
   [goog.Timer :as goog-timer]))

(def delta (atom 1))
(def previous (atom 0))

(defn ^:export setup []
  (let [pb (goog.ui.ProgressBar.)
        pb2 (goog.ui.ProgressBar.)
        timer (goog.Timer. 20)]
    (doto pb 
      (.setOrientation (.. goog.ui.ProgressBar 
                           -Orientation 
                           -VERTICAL))
      (.render (.getElement goog.dom "d")))
    (. pb2 (decorate (.getElement goog.dom "pb2")))
    (. timer (addEventListener 
              "tick"
              (fn [event]
                (if (or (> @previous 100)
                        (< @previous 0))
                  (swap! delta -))
                (swap! previous + @delta)
                (. pb (setValue @previous))
                (. pb2 (setValue @previous)))))
    (. timer (start))
    (. pb (addEventListener
           (.. goog.ui.Component
               -EventType
               -CHANGE)
           (fn [] (this-as 
                   that
                   (. goog.dom (setTextContent 
                                (.getElement goog.dom "out")
                                (str (. that (getValue)) "%"))))))) ))
