(ns tablesorter
  (:require
     [goog.dom :as dom]
     [goog.ui.TableSorter :as table-sorter]))

(defn ^:export setup []
  (let [component (goog.ui.TableSorter.)]
    (doto component
      (.decorate (dom/getElement "sortMe"))
      (.setSortFunction 1 (.alphaSort goog.ui.TableSorter))
      (.setSortFunction 2 (. goog.ui.TableSorter (createReverseSort (.numericSort goog.ui.TableSorter)))) )))
