(ns animationqueue
  (:require
    [goog.dom :as dom]
    [goog.fx :as fx]
    [goog.fx.dom :as fx-dom]
    [goog.fx.AnimationQueue :as fx-anim]
    [goog.events.EventType :as events-et]
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
        currently-playing (atom [])
        parallel-forward (goog.fx.AnimationParallelQueue.)
        parallel-backward (goog.fx.AnimationParallelQueue.)
        serial-forward (goog.fx.AnimationSerialQueue.)
        serial-backward (goog.fx.AnimationSerialQueue.)
        all-slide (fn [x1 x2 block-num anim-duration]
                          (new fx-dom/Slide 
                            (dom/getElement (str "block" block-num))
                            (js/Array x1 5) 
                            (js/Array x2 50) 
                            anim-duration
                            (.. goog.fx easing easeOut)))
        demo-parallel (fn []
                       (if (= @is-forward true)
                           (do (. parallel-backward (play))
                               (swap! @currently-playing assoc 0 parallel-backward))
                           (do (. parallel-forward (play))
                               (swap! @currently-playing assoc 0 parallel-forward)))
                        (swap! is-forward not))
        demo-serial   (fn []
                       (if (= @is-forward true)
                           (do (. serial-backward (play))
                               (swap! @currently-playing assoc 0 serial-backward))
                           (do (. serial-forward (play))
                               (swap! @currently-playing assoc 0 serial-forward)))
                        (swap! is-forward not))
        pause (fn [] (. (get @currently-playing 0) (pause)))
        resume (fn [do-restart] (. (get @currently-playing 0) (pause do-restart)))
       ]
       
    ;; move forward at the same time
    (doto parallel-forward
        (.add (all-slide 5 55 1 2000))
        (.add (all-slide 10 60 2 2000))
        (.add (all-slide 15 65 3 2000))
        (.add (all-slide 20 70 4 2000))
        (.add (all-slide 25 75 5 2000)))

    (doto parallel-backward
        (.add (all-slide 55 5 1 2000))
        (.add (all-slide 60 10 2 2000))
        (.add (all-slide 65 15 3 2000))
        (.add (all-slide 70 20 4 2000))
        (.add (all-slide 75 25 5 2000)))

    (doto serial-forward
        (.add (all-slide 5 55 1 400))
        (.add (all-slide 10 60 2 400))
        (.add (all-slide 15 65 3 400))
        (.add (all-slide 20 70 4 400))
        (.add (all-slide 25 75 5 400)))

    (doto serial-backward
        (.add (all-slide 55 5 1 400))
        (.add (all-slide 60 10 2 400))
        (.add (all-slide 65 15 3 400))
        (.add (all-slide 70 20 4 400))
        (.add (all-slide 75 25 5 400)))

     (.listen goog.events 
              (dom/getElement "play-parallel")
              goog.events.EventType.ClICK
              (demo-parallel))
  )
)
