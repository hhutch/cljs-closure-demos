(ns charcounter
  (:require
    [goog.dom :as dom]
    [goog.ui.CharCounter :as char-counter]
    [goog.ui.CharCounter.Display :as char-counter-display]))

(defn ^:export setup []
  (let [c1 (goog.ui.CharCounter. (dom/getElement "input1")
                                 (dom/getElement "counter1") 160)
        c2 (goog.ui.CharCounter. (dom/getElement "input2")
                                 (dom/getElement "counter2") 160
                                 goog.ui.CharCounter.Display.INCREMENTAL)
        c3 (goog.ui.CharCounter. (dom/getElement "input3")
                                 (dom/getElement "counter3") 10)
        c4 (goog.ui.CharCounter. (dom/getElement "input4")
                                 (dom/getElement "counter4") 255)]
    (.listen goog.events
             (dom/getElement "b1")
             goog.events.EventType.CLICK
             (fn [e] (. c3 (setMaxLength 10))))
    (.listen goog.events
             (dom/getElement "b2")
             goog.events.EventType.CLICK
             (fn [e] (. c3 (setMaxLength 20)))) ))
