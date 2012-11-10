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
        currently-playing (atom 0)
        parallel-forward (goog.fx.AnimationParallelQueue.)
        parallel-backward (goog.fx.AnimationParallelQueue.)
        serial-forward (goog.fx.AnimationSerialQueue.)
        serial-backward (goog.fx.AnimationSerialQueue.)
        all-slide (fn [s t block-num anim-duration]
                    (let [[sx sy] s
                          [tx ty] t]
                      (new fx-dom/Slide 
                           (dom/getElement (str "block" block-num))
                           (js/Array sx sy) 
                           (js/Array tx ty) 
                           anim-duration
                           (.. goog.fx -easing easeOut))))
        demo-parallel (fn []
                        (if (true? @is-forward)
                          (do (. parallel-backward (play))
                              (reset! currently-playing parallel-backward))
                          (do (. parallel-forward (play))
                              (reset! currently-playing parallel-forward)))
                        (swap! is-forward not))
        demo-serial   (fn [e]
                        (if (true? @is-forward)
                          (do (. serial-backward (play))
                              (reset! currently-playing serial-backward))
                          (do (. serial-forward (play))
                              (reset! currently-playing serial-forward)))
                        (swap! is-forward not))
        pause (fn [] (. @currently-playing (pause)))
        resume (fn [do-restart] (. @currently-playing (play do-restart))) ]
    
    (doseq [i [{:fwd parallel-forward :dur 2000}
               {:fwd serial-forward :dur 400}]
            :let [{:keys [fwd dur]} i]]
      (doto fwd 
        (.add (all-slide [5 5] [55 50] 1 dur))
        (.add (all-slide [10 5] [60 50] 2 dur))
        (.add (all-slide [15 5] [65 50] 3 dur))
        (.add (all-slide [20 5] [70 50] 4 dur))
        (.add (all-slide [25 5] [75 50] 5 dur))))

    (doseq [i [{:bkwd parallel-backward :dur 2000}
               {:bkwd serial-backward :dur 400}]
            :let [{:keys [bkwd dur]} i]]
      (doto bkwd
        (.add (all-slide [55 50] [5 5] 1 dur))
        (.add (all-slide [60 50] [10 5] 2 dur))
        (.add (all-slide [65 50] [15 5] 3 dur))
        (.add (all-slide [70 50] [20 5] 4 dur))
        (.add (all-slide [75 50] [25 5] 5 dur))))

    (doseq [i [{:elem "play-parallel" :fun demo-parallel}
               {:elem "play-serial" :fun demo-serial}
               {:elem "pause" :fun pause}
               {:elem "resume" :fun (fn [e] (resume false)) }
               {:elem "restart" :fun (fn [e] (resume true)) }]
            :let [{:keys [elem fun]} i]]
      (.listen goog.events (dom/getElement elem)
               goog.events.EventType.CLICK
               fun)) ))
