(ns bubble
  (:require
    [goog.ui.Bubble :as Bubble]
    [clojure.browser.dom :as dom]))

;; ## Advanced Compiliation breaks this code

(defn click-button
  [anchor text-field]
  (let [ text-string (.value (dom/get-element text-field))]
    (let [bub (goog.ui.Bubble. text-string)]
      (doto bub
        (.setAutoHide nil)
        (.setPosition (goog.positioning.AnchoredPosition. anchor nil))
        (.setTimeout 1000)
        (. (render))
        (.attach (dom/get-element anchor))
        (.setVisible true)) )))

(defn calc-random []
  (let [number (+ (Math.floor (* (Math.random nil) 9)) 1)]
    (if (= number 5)
        (calc-random)
        number)))

(defn button-random []
  (let [button (dom/get-element (str "button" (calc-random)))]
    (. button (click))))

(defn button-custom 
  [xcoord ycoord corner auto-hide timeout decorated]
  (let [xcoord (window.parseInt (.value (dom/get-element xcoord)))
        ycoord (window.parseInt (.value (dom/get-element ycoord)))
        corner (window.parseInt (.value (dom/get-element corner))) 
        timeout (window.parseInt (.value (dom/get-element timeout))) 
        internal-element "Random Bubble. La-la-la-la! La-la-la-la-la!!!"
        bub (goog.ui.Bubble. internal-element) ]
    (doto bub
      (.setId "custom-bubble")
      (.setAutoHide nil)
      (.setPinnedCorner corner)
      (.setPosition (goog.positioning.AbsolutePosition. xcoord ycoord))
      (.setTimeout timeout)
      (. (render))
      (.setVisible true))))

;(defn toggle-bub-visibility []
;  (let [bub (

(defn ^:export setup []
  (doseq [btn [1 2 3 4 6 7 8]]
    (.listen goog.events (dom/get-element (str "button" btn))
                          goog.events.EventType.CLICK
                         (fn [e] (click-button (str "button" btn) (str "textField" btn))))) 
  (.listen goog.events (dom/get-element "button5.1")
                        goog.events.EventType.CLICK
                       (fn [e] (button-random)))
  (.listen goog.events (dom/get-element "button5.0.0")
                        goog.events.EventType.CLICK
                       (fn [e] (button-custom "xcoord" "ycoord" "corner" "autoHide" "timeout" "decorated")))
  (.listen goog.events (dom/get-element "button5.0.1")
                        goog.events.EventType.CLICK
                       (fn [e] (js/alert "goog.ui.Button doesn't let me use an existing element?  how do you keep track of an anonymous element in a non-mutable non-global context?"))))

