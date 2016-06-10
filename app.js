var mvcExample = {};

mvcExample.Model = function() {
	this.arr = [];
    this.text = "";
    this.onChange = null;
    this.arrChange = null;
};

mvcExample.Model.prototype.setText = function(value) {
    this.text = value.toUpperCase();
    if (this.onChange) {
        this.onChange(this.text);
    }
};
mvcExample.Model.prototype.addItem = function (value) {
	this.arr.push(value);
	if(this.arrChange){
		this.arrChange(this.arr);
	}
};

// VIEW

mvcExample.View = function(elementId, submitBtn, ul, initialValue) {
    this.element = document.getElementById(elementId);
    this.list = document.getElementById(ul);
    this.setValue(initialValue || '');
    this.onInput = null;

    this.element.addEventListener('input', this._onInput.bind(this));

    this.submit = document.getElementById(submitBtn);
    this.submit.addEventListener('click', this._onSubmit.bind(this));
    this.submitCallback = null;

};
mvcExample.View.prototype._onSubmit = function (event) {
	var value = this.element.value;
	if (this.submitCallback){
		this.submitCallback(value);
	}
};
mvcExample.View.prototype.updateList = function (arr) {	
	console.log(this.list);

	while( this.list.firstChild ){
	  this.list.removeChild( this.list.firstChild );
	}

	for(item in arr){
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(arr[item]));
  		this.list.appendChild(li);
	}
};

mvcExample.View.prototype._onInput = function(event) {
    var value = event.target.value;
    if (this.onInput) {
    	// console.log(this.onInput);
        this.onInput(value);
    }
};

mvcExample.View.prototype.setValue = function(text) {
    this.element.value = text;
};




mvcExample.Controller = function(model, view) {
    view.onInput = model.setText.bind(model);
    view.submitCallback = model.addItem.bind(model);
    model.arrChange = view.updateList.bind(view);
    model.onChange = view.setValue.bind(view);
};




document.addEventListener('DOMContentLoaded', function() {
    var model = new mvcExample.Model();
    var view = new mvcExample.View('uppercase','submit','list');
    var controller = new mvcExample.Controller(model, view);
});