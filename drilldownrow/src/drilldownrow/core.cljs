(ns drilldownrow
  (:require
    [goog.dom :as dom]
    [goog.ui.DrilldownRow :as drill-down-row]))

(defn ^:export setup []
  (let [ff (dom/getElement "firstRow")
        d (goog.ui.DrilldownRow. (.strobj {}))
        d1 (goog.ui.DrilldownRow. (.strobj {"html" "<tr><td>Second row</td><td>Second column</td></tr>"}))
        d2 (goog.ui.DrilldownRow. (.strobj {"html" "<tr><td>Third row</td><td>Second column</td></tr>"}))
        d21 (goog.ui.DrilldownRow. (.strobj {"html" "<tr><td>Fourth row</td><td>Second column</td></tr>"}))
        d22 (goog.ui.DrilldownRow. (.sampleProperties goog.ui.DrilldownRow)) ]
    (. d (decorate ff))
    (. d (addChild d1 true))
    (. d (addChild d2 true))
    (. d2 (addChild d21 true))
    (. d2 (addChild d22 true)) ))

