(ns serverchart
  (:require 
    [goog.dom :as dom]
    [goog.ui.ServerChart :as server-chart]))

;; stolen from http://mmcgrana.github.com/2011/09/clojurescript-nodejs.html
(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
   other ClojureScript colls into JavaScript arrays, and ClojureScript
   keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (apply array (map clj->js x))
    :else x))

(defn ^:export setup []
    (let [chart (goog.ui.ServerChart. goog.ui.ServerChart.ChartType.LINE)
          finance (goog.ui.ServerChart. goog.ui.ServerChart.ChartType.FINANCE)
          pie (goog.ui.ServerChart. goog.ui.ServerChart.ChartType.PIE 350 140) 
          filled-line (goog.ui.ServerChart.  goog.ui.ServerChart.ChartType.FILLEDLINE 180 104)
          bar (goog.ui.ServerChart. goog.ui.ServerChart.ChartType.BAR 180 104) 
          venn (goog.ui.ServerChart. goog.ui.ServerChart.ChartType.VENN 300 200) 
          update-finance-chart (fn [] 
            (. finance (addDataSet (clj->js [25 28 31 30 25 21 26 39 36 28 23 26 31 38 39 28 26]) "4582e7"))
            (. finance (updateChart)) ) ]

    (doto chart
      (.addDataSet (clj->js [5 15 10 25 20 49 10 25 34 25 39 44 49 59 44])  "ff0000")
      (.addDataSet (clj->js [90 92 98 90 52 54 54 43 72 48 51 72 48 51]) "0000ff")
      (.setXLabels (clj->js ["Jan" "Feb" "Mar" "Jun" "Jul" "Aug"]))
      (.setLeftLabels (clj->js [0 25 50 75 100]))
      (.setRightLabels (clj->js [0 50 100]))
      (.setMinValue "-50")
      (.decorate (dom/getElement "line_chart")) )

    ;; Finance Chart
    (doto finance
      (.setRightLabels (clj->js ["-0.25%"  "0.00%"  "+0.25%"  "+0.50%"]))
      (.setMiscParameter 2)
      (.setMaxValue 100)
      (.setMinValue 0)
      (.addDataSet (clj->js [43 44 48 49 52 49 48 44 43 52 49 44 43]) "da3b15")
      (.addDataSet (clj->js [72 66 62 49 48 43 44 49 61 67 70 62 64 70]) "f7a10a")
      (.render (dom/getElement "test2")) )
    (.listen goog.events
             (dom/getElement "update-finance")
             "click"
             (fn [e] (update-finance-chart)))

    ;; Pie Chart
    (doto pie
      (.setMinValue 0)
      (.setMaxValue 100)
      (.addDataSet (clj->js [7 50 3 30 3 8])  "ff9900")
      (.setXLabels (clj->js ["Internet Explorer 7" 
                            "Internet Explorer 6" 
                            "Internet Explorer 5" 
                            "Firefox" 
                            "Mozilla" 
                            "Other"]))
      (.render (dom/getElement "test3")) )


    ;; Filled Line Chart
    (doto filled-line
      (.addDataSet (clj->js [11 49 61 61 66 44 61 43]) "FF0000")
      (.setLeftLabels (clj->js ["20K" "" "60K" "" "100K"]))
      (.setXLabels (clj->js ["M" "J" "J" "A" "S" "O" "N" "D" "J" "F" "M" "A"]))
      (.setMaxValue 100)
      (.render (dom/getElement "test4")))

    ;; Bar Chart
    (doto bar
      (.addDataSet (clj->js [8 23 7])  "008000")
      (.addDataSet (clj->js [31 11 7])  "ffcc33")
      (.addDataSet (clj->js [2 43 70 3 43 74]) "3072f3")
      (.setLeftLabels (clj->js ["" "20K" "" "60K" "" "100K"]))
      (.setXLabels (clj->js ["O" "N" "D"]))
      (.setMaxValue 100)
      (.render (dom/getElement "test5")) )

    ;; Venn Diagram
    (let [weights (clj->js [80  ;; Size of circle A
                            60  ;; Size of circle B
                            40  ;; Size of circle C
                            20  ;; Overlap of A and B
                            20  ;; Overlap of A and C
                            20  ;; Overlap of B and C
                            5])  ;; Overlap of A, B and C
          labels (clj->js ["C Hackers"      ;; Label for A
                           "LISP Gurus"     ;; Label for B
                           "Java Jockeys"])] ;; Label for C
      (doto venn
        (.setTitle "Google Employees")
        (.setVennSeries weights labels)
        (.render (dom/getElement "test6"))) )

))
