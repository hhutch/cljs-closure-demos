(ns keyboardshortcuts
  (:require
    [goog.dom :as dom]
    [goog.events.KeyCodes :as key-codes]
    [goog.ui.KeyboardShortcutHandler :as shortcut] ))

(defn ^:export setup []
  (let [show-triggered (fn [event]
                         (goog.dom.setTextContent. 
                           (goog.dom.getElement. "text")
                           (str "Shortcut Triggered: " (.identifier event))))
        shortcut-handler (goog.ui.KeyboardShortcutHandler. js/document)
        NONE (.. goog.ui.KeyboardShortcutHandler Modifiers NONE)
        CTRL (.. goog.ui.KeyboardShortcutHandler Modifiers CTRL)
        SHIFT (.. goog.ui.KeyboardShortcutHandler Modifiers SHIFT)
        ALT (.. goog.ui.KeyboardShortcutHandler Modifiers ALT)
        META (.. goog.ui.KeyboardShortcutHandler Modifiers META) ]
    (doto shortcut-handler
      (.registerShortcut "A" "a")
      (.registerShortcut "T E S T" "t e s t")
      (.registerShortcut "SHIFT_F12" "shift+f12")
      (.registerShortcut "SHIFT_F11 C" "shift+f11 c")
      (.registerShortcut "META_Y" "meta+y")
      (.registerShortcut "G S" "g s")
      (.registerShortcut "S" "s")
      (.registerShortcut 
                            "GOOG"
                            (.G goog.events.KeyCodes) NONE
                            (.O goog.events.KeyCodes) NONE
                            (.O goog.events.KeyCodes) NONE
                            (.G goog.events.KeyCodes))
      (.registerShortcut 
                            "CTRL_A" (.A goog.events.KeyCodes) CTRL)
      (.registerShortcut 
                            "BC" 
                            (.B goog.events.KeyCodes)
                            NONE
                            (.C goog.events.KeyCodes))
      (.registerShortcut 
                            "BD" 
                            (.B goog.events.KeyCodes)
                            NONE
                            (.D goog.events.KeyCodes))
      (.registerShortcut 
                            "ALT_Q A" 
                            (.Q goog.events.KeyCodes)
                            ALT
                            (.A goog.events.KeyCodes))
      (.registerShortcut 
                            "ALT_Q SHIFT_A" 
                            (.Q goog.events.KeyCodes)
                            ALT
                            (.A goog.events.KeyCodes)
                            SHIFT)
      (.registerShortcut 
                            "ALT_Q SHIFT_B" 
                            (.Q goog.events.KeyCodes)
                            ALT
                            (.B goog.events.KeyCodes)
                            SHIFT)
      (.registerShortcut "SPACE"
                            (.SPACE goog.events.KeyCodes))
      (.registerShortcut "HOME"
                            (.HOME goog.events.KeyCodes))
      (.registerShortcut "ENTER"
                            (.ENTER goog.events.KeyCodes)))


;    (.apply registerShortcut 
;                          (cons "GOOG"
;                            (interpose NONE
;                              (map #(aget goog.events.KeyCodes (name %))
;                                [:G :O :O :G])))))

    (.listen goog.events
      shortcut-handler
      (.. goog.ui.KeyboardShortcutHandler EventType SHORTCUT_TRIGGERED)
      show-triggered) ))
