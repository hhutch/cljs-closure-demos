(ns animationqueue
  (:require
    [goog.dom :as dom]
    [goog.fx :as fx]
    [goog.fx.dom :as fx-dom]
    [goog.fx.AnimationQueue :as fx-anim]
    [goog.events :as events]))

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
  (let [sx 5
        sy 5
        is-forward (atom false)
        parallel-forward (goog.fx.AnimationParallelQueue.)
        parallel-backward (goog.fx.AnimationParallelQueue.)
        serial-forward (goog.fx.AnimationSerialQueue.)
        serial-backward (goog.fx.AnimationSerialQueue.)
        par-slide (fn [x1 x2 block-num]
                          (fx-dom/Slide 
                            (dom/getElement (str "block" block-num))
                            (clj->js [x1 5]) 
                            (clj->js [x2 50]) 
                            2000 
                            (.. goog.fx easing easeOut)))
        demo-parallel (fn []
                       (if (is-forward)
                           (do (. parallel-backward (play)))
                           (do (. parallel-forward (play))))
                        (swap! is-forward not))
       ]
       
    ;; move forward at the same time
    (doto parallel-forward
        (.add (par-slide 5 55 1))
        (.add (par-slide 10 60 2))
        (.add (par-slide 15 65 3))
        (.add (par-slide 20 70 4))
        (.add (par-slide 25 75 5)))

    (doto parallel-backward
        (.add (par-slide 55 5 1))
        (.add (par-slide 60 10 2))
        (.add (par-slide 65 15 3))
        (.add (par-slide 70 20 4))
        (.add (par-slide 75 25 5)))

     (events/listen demo-parallel
                    goog.events.EventType.Click
                    (demo-parallel))
  )
)
