import * as React from 'react';
import { describe } from '@bigtest/mocha';
import { mount } from '@bigtest/react';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { FirstTodoPage } from 'tests/helpers/pages/first-todo';

import TodoDisplay from '../display';

const todo = new FirstTodoPage();

describe('Integration | Component | todo', () => {
  describe('mounting', () => {
    beforeEach(async () => {
      const props = {
        todo: { id: 1, text: 'hi', completed: false },
        toggleCompletion: sinon.spy(),
        destroyTodo: sinon.spy(),
        editTodo: sinon.spy()
      };

      await mount(() => <TodoDisplay {...props} />);
    });

    it('suceeds', async () => {
      expect(document.querySelector('[data-test-todo]')).to.exist;
    });
  });

  describe('click label', () => {
    let editTodo;

    beforeEach(async () => {
      editTodo = sinon.spy();
      const props = {
        todo: { id: 1, text: 'hi', completed: false },
        toggleCompletion: sinon.spy(),
        destroyTodo: sinon.spy(),
        editTodo
      };

      await mount(() => <TodoDisplay {...props} />);

      await todo.clickLabel();
    });


    it('toggles editing', () => {
      expect(todo.isEditing).to.be.true;
    });

    describe('enter key', () => {
      beforeEach(async () => {
        await todo.pressEnter();
      });

      it('blurs the field', () => {
        expect(todo.isEditing).to.be.false;
      });

      it('submits the change', () => {
        expect(editTodo).to.have.been.calledWith(1, 'hi');
      });
    });

    describe('escape key', () => {
      beforeEach(async () => {
        // const event = document.createEvent('keydown', {target: todo.input});
        await todo.pressEscape();
      });

      it('blurs the field', () => {
        expect(todo.isEditing).to.be.false;
      });

      it('submits the change', () => {
        expect(editTodo).to.have.been.calledWith(1, 'hi');
      });
    });

    describe('tab key', () => {
      beforeEach(async () => {
        await todo.pressTab();
      });

      it('blurs the field', () => {
        expect(todo.isEditing).to.be.false;
      });

      it('submits the change', () => {
        expect(editTodo).to.have.been.calledWith(1, 'hi');
      });
    });
  });

});
