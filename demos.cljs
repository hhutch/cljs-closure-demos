(ns demos 
  (:require
    [goog.events :as g-event]
    [goog.dom :as dom]))

(defn ^:export setup []
  (let [all-demos (dom/getElementsByClass "demo")]
    (doseq [i (range (.length all-demos))]
      (let [elem (. all-demos (item i))
            href (. elem (getAttribute "href"))]
        (if (.. elem className (match (js/RegExp (str "(\\s|^)" "inactive" "(\\s|$)"))))
            (dom/setProperties elem (.strobj {"href" nil})))))))
;            (do (.listen goog.events 
;                         elem
;                         goog.events.EventType.CLICK
;                         (fn [e] (js/alert "why") )) ))))))
