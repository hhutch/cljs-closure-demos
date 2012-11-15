(ns drilldownrow
  (:require
    [goog.dom :as dom]
    [goog.ui.DrilldownRow :as dd-row]))

(defn ^:export setup []
  (let [ff (dom/getElement "firstRow")
        build-dd #(goog.ui.DrilldownRow. (.-strobj %))
        d (build-dd {})
        d1 (build-dd {"html" "<tr><td>Second row</td><td>Second column</td></tr>"})
        d2 (build-dd {"html" "<tr><td>Third row</td><td>Second column</td></tr>"})
        d21 (build-dd {"html" "<tr><td>Fourth row</td><td>Second column</td></tr>"})
        d22 (goog.ui.DrilldownRow. (.-sampleProperties goog.ui.DrilldownRow)) ]
    (doto d (.decorate ff)
          (.addChild d1 true)
          (.addChild d2 true))
    (doto d2 (.addChild d21 true)
          (.addChild d22 true) )))

