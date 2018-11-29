var doc = new jsPDF({
	orientation: 'l',
	unit: 'mm',
	format: 'a4'
 });

doc.text('Hello world!', 10, 10)
doc.save('a4.pdf')