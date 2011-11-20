(ns gauge
  (:require
    [goog.dom :as dom]
    [goog.graphics :as g]
    [goog.graphics.Font :as g-font]
    [goog.graphics.LinearGradient :as g-lineargradient]
    [goog.graphics.SolidFill :as g-solidfill]
    [goog.graphics.Stroke :as g-stroke]
    [goog.ui.Gauge :as goog-gauge]
    [goog.ui.GaugeTheme :as gauge-theme]))

(defn ^:export setupGauges []
  (let [gauge (goog.ui.Gauge. 120 120)]
    (doto gauge
      (.setValue 33)
      (.render (dom/getElement "basic"))))
  (let [gauge (goog.ui.Gauge. 200 200)]
    (doto gauge
            (.addBackgroundColor 50 60 goog.ui.Gauge.RED)
            (.addBackgroundColor 35 50 goog.ui.Gauge.YELLOW)
            (.addBackgroundColor 15 25 goog.ui.Gauge.GREEN)
            (.setMinimum 15)
            (.setMaximum 60)
            (.setTicks 3 6)
            (.setValue 60)
            (.setTitleBottom "RPM")
            (.render (dom/getElement "colors")))) 
  (let [gauge (goog.ui.Gauge. 300 200)
        gauge-set-value (fn [& _] (let [v (js/parseInt (.value (dom/getElement "v1")))]
                                  (. gauge (setValue v (str v "%")))))]
    (doto gauge
      (.addBackgroundColor 0 30 goog.ui.Gauge.RED)
      (.addBackgroundColor 75 90 goog.ui.Gauge.YELLOW)
      (.addBackgroundColor 90 100 goog.ui.Gauge.RED)
      (.setTitleTop "CPU Utilization")
      (.setTicks 5 2)
      (.setMajorTickLabels (apply array ["Idle" "20%" "40%" "60%" "80%" "Argh"]))
      (.render (dom/getElement "interactive")))
    (gauge-set-value)
    (.listen goog.events 
             (dom/getElement "v1_button")
             goog.events.EventType.CLICK
             gauge-set-value))

;        var theme = new CustomGaugeTheme();
;        gauge.setTheme(theme);
;        gauge.render(document.getElementById('customcolors'));
  (let [gauge (goog.ui.Gauge. 200 200)
        custom-theme (Function.)]
    (goog.inherits custom-theme goog.ui.GaugeTheme)
    (. (.prototype custom-theme) (getInternalBorderFill (fn [cx cy r] (goog.graphics.SolidFill. "#8080ff"))))
    (doto gauge
      (.setMinimum -30)
      (.setMaximum 30)
      (.setTicks 10 0)
      (.setValue 20)
      (.setTheme (new custom-theme))
      (.render  (dom/getElement "customcolors")))) )
