"use strict";(self.webpackChunkch_blog=self.webpackChunkch_blog||[]).push([[493],{4570:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>r});const s=JSON.parse('{"id":"python_gui1/\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f","title":"\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f","description":"\u5728database\u6587\u4ef6\u5939\u4e0b\u5206\u522b\u521b\u5efastudent_db.py\u6587\u4ef6\uff0c\u521b\u5efa\u5b66\u751f\u4fe1\u606f\u7ba1\u7406\u6a21\u578b\u3002","source":"@site/docs/python_gui1/\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f.md","sourceDirName":"python_gui1","slug":"/python_gui1/\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f","permalink":"/docs/python_gui1/\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f","draft":false,"unlisted":false,"editUrl":"https://github.com/haochan1996/haochan1996.github.io/tree/main/docs/python_gui1/\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"\u6570\u636e\u5e93\u96c6\u6210\u521b\u5efa\u57fa\u7c7b","permalink":"/docs/python_gui1/\u6570\u636e\u5e93\u96c6\u6210\u521b\u5efa\u57fa\u7c7b"},"next":{"title":"\u65b0\u589e\u6dfb\u52a0\u5b66\u751f\u7a97\u53e3","permalink":"/docs/python_gui1/\u65b0\u589e\u6dfb\u52a0\u5b66\u751f\u7a97\u53e3"}}');var d=t(4848),a=t(8453);const o={sidebar_position:4},i="\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f",l={},r=[];function c(e){const n={code:"code",h1:"h1",header:"header",img:"img",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"\u521b\u5efa\u5b66\u751f\u6a21\u578b\u83b7\u53d6\u4fe1\u606f",children:"\u521b\u5efa\u5b66\u751f\u6a21\u578b&\u83b7\u53d6\u4fe1\u606f"})}),"\n",(0,d.jsxs)(n.p,{children:["\u5728",(0,d.jsx)(n.code,{children:"database"}),"\u6587\u4ef6\u5939\u4e0b\u5206\u522b\u521b\u5efa",(0,d.jsx)(n.code,{children:"student_db.py"}),"\u6587\u4ef6\uff0c\u521b\u5efa\u5b66\u751f\u4fe1\u606f\u7ba1\u7406\u6a21\u578b\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-python",children:'# student_db.py\nfrom database.base_db import DatabaseManage\n\n\nclass StudentDB(DatabaseManage):\n    """\u5b66\u751f\u4fe1\u606f\u7ba1\u7406\u6a21\u578b"""\n\n    def fetch_students(self):\n\n        query = """\n        SELECT s.*, c.class_name, (s.chinese_score + s.math_score + s.english_score) as total_score\n        FROM student s\n        JOIN classes c ON s.class_id = c.class_id\n        """\n        return self.fetch_query(query=query)\n\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u6211\u4eec\u53ef\u4ee5\u7b80\u5355\u6d4b\u8bd5\u4e00\u4e0b\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-python",children:'from database.student_db import StudentDB\n\nif __name__ == "__main__":\n    with StudentDB() as db:\n        res = db.fetch_students()\n        print(res)\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u4f1a\u8f93\u51fa\u6570\u636e\u5e93\u4e2d\u7684\u4fe1\u606f\uff0c\u4ee5\u5b57\u5178\u5217\u8868\u7684\u5f62\u5f0f\u8f93\u51fa\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"[{'student_id': 1, 'student_name': '\u5f20\u4e09', 'student_number': '2025040601', 'gnder': 1, 'class_id': 1, 'chinese_score': 84.0, 'math_score': 92.0, 'english_score': 99.0, 'class_name': '\u4e00\u5e74\u7ea71\u73ed'}, {'student_id': 2, 'student_name': '\u674e\u56db', 'student_number': '2025040602', 'gnder': 2, 'class_id': 1, 'chinese_score': 88.0, 'math_score': 22.0, 'english_score': 100.0, 'class_name': '\u4e00\u5e74\u7ea71\u73ed'}, {'student_id': 3, 'student_name': '\u738b\u4e94', 'student_number': '2025040603', 'gnder': 1, 'class_id': 1, 'chinese_score': 22.0, 'math_score': 22.0, 'english_score': 11.0, 'class_name': '\u4e00\u5e74\u7ea71\u73ed'}]\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\u518d\u56de\u5230\u524d\u9762\u7684",(0,d.jsx)(n.code,{children:"sutdent_interface.py"}),"\u6587\u4ef6\uff0c\u5176\u4e2d\u7684",(0,d.jsx)(n.code,{children:"load_data"}),"\u6211\u4eec\u624b\u52a8\u5b9a\u4e49\u4e86\u4e00\u4e9b\u5047\u6570\u636e\uff0c\u73b0\u5728\u6211\u4eec\u53ef\u4ee5\u5b8c\u5584\u8fd9\u4e2a\u65b9\u6cd5\u4f7f\u5176\u76f4\u63a5\u4ece\u6570\u636e\u5e93\u4e2d\u52a0\u8f7d\u6570\u636e\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-python",children:'from PySide6.QtWidgets import (\n    QWidget,\n    QTableWidgetItem,\n    QVBoxLayout,\n    QHBoxLayout,\n    QPushButton,\n    QLineEdit,\n    QLabel,\n    QTableWidget,\n    QHeaderView,\n    QCheckBox,\n    QMessageBox,\n)\nfrom PySide6.QtCore import Qt\n\nfrom qfluentwidgets import (\n    CardWidget,\n    PushButton,\n    SearchLineEdit,\n    TableWidget,\n    setCustomStyleSheet,\n)\nfrom utils.custom_style import *\nfrom database.student_db import StudentDB\n\n\nclass StudentInterface(QWidget):\n    def __init__(self, parent=None):\n        super().__init__(parent)\n        self.setWindowTitle("\u5b66\u751f\u4fe1\u606f\u7ba1\u7406\u7cfb\u7edf")\n        self.setGeometry(100, 100, 800, 600)\n        self.initUI()\n        self.load_data()\n        self.popualte_table()\n\n    def initUI(self):\n        # Set up the UI components here\n        self.layout = QVBoxLayout(self)\n\n        # \u7b2c\u4e00\u90e8\u5206 \u9876\u90e8\u6309\u94ae\u7ec4\n        self.card_widget = CardWidget(self)\n        self.buttons_layout = QHBoxLayout(self.card_widget)\n\n        self.add_button = PushButton("\u65b0\u589e", self)\n        setCustomStyleSheet(self.add_button, ADD_BUTTON_STYLE, ADD_BUTTON_STYLE)\n        self.searchInput = SearchLineEdit(self)\n        self.searchInput.setPlaceholderText("\u8bf7\u8f93\u5165\u5b66\u53f7\u6216\u59d3\u540d")\n        self.searchInput.setFixedWidth(500)\n        self.batch_delete_button = PushButton("\u6279\u91cf\u5220\u9664", self)\n        setCustomStyleSheet(\n            self.batch_delete_button,\n            BATCH_DELETE_BUTTON_STYLE,\n            BATCH_DELETE_BUTTON_STYLE,\n        )\n\n        self.buttons_layout.addWidget(self.add_button)\n        self.buttons_layout.addWidget(self.searchInput)\n        self.buttons_layout.addStretch(1)  # Add stretch to push the buttons to the left\n        self.buttons_layout.addWidget(self.batch_delete_button)\n        self.layout.addWidget(self.card_widget)\n\n        # \u7b2c\u4e8c\u90e8\u5206\uff1aCreate table widget\n        self.table_widget = TableWidget(self)\n        self.table_widget.setBorderRadius(10)  # \u8bbe\u7f6e\u8fb9\u6846\u5706\u89d2\n        self.table_widget.setColumnCount(11)  # \u8bbe\u7f6e\u5217\u6570\n        self.table_widget.setHorizontalHeaderLabels(\n            [\n                "",\n                "\u5b66\u751fID",\n                "\u59d3\u540d",\n                "\u5b66\u53f7",\n                "\u6027\u522b",\n                "\u73ed\u7ea7",\n                "\u8bed\u6587",\n                "\u6570\u5b66",\n                "\u82f1\u8bed",\n                "\u603b\u5206",\n                "\u64cd\u4f5c",\n            ]\n        )  # \u8bbe\u7f6e\u8868\u5934\u6587\u5b57\n        self.table_widget.horizontalHeader().setSectionResizeMode(\n            QHeaderView.Stretch\n        )  # \u586b\u5145\u6ee1\n        self.layout.addWidget(self.table_widget)\n\n        # self.setStyleSheet("StudnetInterface {background-color: #f0f0f0;}")\n        self.resize(1280, 760)\n\n    def load_data(self):\n        """\u52a0\u8f7d\u6570\u636e\u5230\u8868\u683c"""\n        with StudentDB() as db:\n            self.students = db.fetch_students()\n\n    def popualte_table(self):\n        """\u663e\u793a\u56fe\u8868"""\n        self.table_widget.setRowCount(len(self.students))  # \u8bbe\u7f6e\u884c\u6570\n        for row, student_info in enumerate(self.students):  # \u904d\u5386\u6570\u636e\uff0c\u5199\u5165\u5230\u6bcf\u4e00\u884c\n            self.setup_table_row(row, student_info)\n\n    def setup_table_row(self, row, student_info):\n        """\u8bbe\u7f6e\u8868\u683c\u884c"""\n        checkbox = QCheckBox()\n        self.table_widget.setCellWidget(row, 0, checkbox)  # 0\u884c0\u5217\u7684\u8bbe\u7f6e\u4e3acheckbox\n        for col, key in enumerate(\n            [\n                "student_id",\n                "student_name",\n                "student_number",\n                "gender",\n                "class_name",\n                "chinese_score",\n                "math_score",\n                "english_score",\n                "total_score",\n            ]\n        ):\n            value = student_info.get(key, "")\n            if key == \'gender\':\n                value = "\u7537" if value == 1 else "\u5973" if value == 0 else "\u672a\u77e5"\n            # \u5355\u5143\u683c\u8d4b\u503c\n            item = QTableWidgetItem(str(value))\n            self.table_widget.setItem(row, col + 1, item)\n\n'})}),"\n",(0,d.jsxs)(n.p,{children:["\u63a5\u4e0b\u6765\u6211\u4eec\u5728",(0,d.jsx)(n.code,{children:"main.py"}),"\u4e2d\u76f4\u63a5\u8c03\u7528",(0,d.jsx)(n.code,{children:"StudentInterface"})]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-py",children:'# main.py\nfrom PySide6.QtWidgets import QApplication\nfrom student.student_interface import StudentInterface\nfrom database.student_db import StudentDB\n\nif __name__ == "__main__":\n    import sys\n    from PySide6.QtWidgets import QApplication\n\n    app = QApplication(sys.argv)\n    window = StudentInterface()\n    window.show()\n    sys.exit(app.exec())\n\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u8fd9\u6837\u6551\u80fd\u76f4\u63a5\u4ece\u6570\u636e\u5e93\u4e2d\u52a0\u8f7d\u6570\u636e\u5e76\u663e\u793a\u3002"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{src:"https://blog-1301697820.cos.ap-guangzhou.myqcloud.com/blog/image-20250406232645673.png",alt:"image-20250406232645673"})})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var s=t(6540);const d={},a=s.createContext(d);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);