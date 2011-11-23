(ns editor
  (:require
    [goog.dom :as dom]
    [goog.editor.Field :as goog-editor-field]
    [goog.editor.plugins.BasicTextFormatter :as basic-text-formatter]
    [goog.editor.plugins.RemoveFormatting :as remove-formatting]
    [goog.editor.plugins.UndoRedo :as undo-redo]
    [goog.editor.plugins.ListTabHandler :as list-tab-handler]
    [goog.editor.plugins.SpacesTabHandler :as spaces-tab-handler]
    [goog.editor.plugins.EnterHandler :as enter-handler]
    [goog.editor.plugins.HeaderFormatter :as header-formatter]
    [goog.editor.plugins.LinkDialogPlugin :as link-dialog-plugin]
    [goog.editor.plugins.LinkBubble :as link-bubble]
    [goog.ui.editor.DefaultToolbar :as default-toolbar]
    [goog.ui.editor.ToolbarController :as toolbar-controller]))

(defn add-link 
  [parent file]
  (let [ss (dom/createDom "link")]
    (dom/setProperties ss (.strobj {"type" "text/css"
                                    "rel" "stylesheet"
                                    "href" file}))
    (dom/appendChild parent ss)))

(defn ^:export prepenvironment []
  (let [head-list (dom/getElementsByTagNameAndClass "head")
        prep-css (fn [dir file] (str dir (name file) ".css"))
        head (. head-list (item 0)) ]
       (doseq [css-file-path 
               (map #(prep-css "../css/" %) 
                    [ :demo :button :dialog :linkbutton :menu :menuitem
                      :menuseparator :tab :tabbar :toolbar 
                      :colormenubutton :palette :colorpalette 
                      :editortoolbar ])]
         (add-link head css-file-path)) 
       (doseq [css-file-path (map #(prep-css "css/editor/" %) 
                                  [:bubble :dialog :linkdialog])]
         (add-link head css-file-path)) ))

(defn ^:export buildeditor [edit-field-id edit-toolbar-id]
  (let [goog-editor (goog.editor.Field. edit-field-id)
        buttons (vec (map #(aget goog.editor.Command (name %)) 
                                              [:BOLD :ITALIC :UNDERLINE
                                               :FONT_COLOR :BACKGROUND_COLOR :FONT_FACE
                                               :FONT_SIZE :LINK :UNDO
                                               :REDO :UNORDERED_LIST :ORDERED_LIST
                                               :INDENT :OUTDENT :JUSTIFY_LEFT
                                               :JUSTIFY_CENTER :JUSTIFY_RIGHT :SUBSCRIPT
                                               :SUPERSCRIPT :STRIKE_THROUGH :REMOVE_FORMAT] ))]

    (goog.ui.editor.ToolbarController. goog-editor (goog.ui.editor.DefaultToolbar.makeToolbar. 
                                                   buttons.array (goog.dom.getElement. edit-toolbar-id)))
    ;(. goog-editor (registerPlugin (new basic-text-formatter)))
    (apply #(. goog-editor (registerPlugin (new (aget goog.editor.plugins (name %))))) 
                                                   [:BasicTextFormatter :RemoveFormatting
                                                    :UndoRedo :ListTabHandler
                                                    :SpacesTabHandler :EnterHandler
                                                    :HeaderFormatter :LinkDialogPlugin
                                                    :LinkBubble])

    (. goog-editor (makeEditable)) ))
