(ns domselection
  (:require
    [goog.dom :as dom]
    [goog.events :as goog-events]
    [goog.dom.selection :as select]))

(def is-syncing (atom false))
(def $ #(dom/getElement %))

(defn sync [i]
  (reset! is-syncing true)
  (let [text-field ($ (str "textField" i))
        get-num-elem #($ (str % i))]
    (set! (.-value (get-num-elem "selectionStart")) (select/getStart text-field) )
    (set! (.-value (get-num-elem "selectionEnd")) (select/getEnd text-field) )
    (set! (.-value (get-num-elem "selectionText")) (select/getText text-field) ) )
  (reset! is-syncing false))

(defn update [i]
  (reset! is-syncing true)
  (let [selection-start (.-value ($ (str "selectionStart" i)))
        selection-end (.-value ($ (str "selectionEnd" i)))
        selection-text (.-value ($ (str "selectionText" i)))
        text-field ($ (str "textField" i)) ]
    (. text-field (focus))
    (if (not (js/isNaN selection-start))
      (select/setStart text-field selection-start))
    (if (not (js/isNaN selection-end))
      (select/setEnd text-field selection-end))
    (select/setText text-field selection-text) )
  (reset! is-syncing false)
  (sync i) )

(defn ^:export setup []
  (sync 1)
  (sync 2) 
  (doto goog.events
    (.listen
     ($ "button1") "click" #(update 1))
    (.listen
     ($ "button2") "click" #(update 2))
    (.listen
     ($ "textField1") "keydown" #(sync 1))
    (.listen
     ($ "textField1") "keyup" #(sync 1))
    (.listen
     ($ "textField2") "keydown" #(sync 2))
    (.listen
     ($ "textField2") "keyup" #(sync 2))))
