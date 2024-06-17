import { Actor } from './sprites/actor.js';

export class Stack {
    items: any[] = [];
    push(item: any) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

class LinkedList {
    items: BehaviourTreeNode[] = [];
    add(item: BehaviourTreeNode) {
        this.items.push(item);
    }
}

export class BehaviourTreeBuilder {
    // tree: BehaviourTree;
    curNode: BehaviourTreeNode | undefined = undefined;
    parentNodeStack: Stack = new Stack()
    
    // constructor() {
    //     this.tree = new BehaviourTree();
    // }

    action(name: string, func: Function) {
        if (this.parentNodeStack.isEmpty()) {
            throw new Error('Unnested tree');
        }
        let action = new Action(name, func);
        this.parentNodeStack.peek()!.addChild(action);
        return this;
    }

    // condition(name: string, func: Function) {
    //     let condition = new Condition(name, func);
    //     this.tree.currentNode.children.push(condition);
    //     return this;
    // }

    sequence(name: string) {
        let sequenceNode = new Sequence(name)
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek()!.addChild(sequenceNode)
        }
        this.parentNodeStack.push(sequenceNode)
        return this
    }

    selector(name: string) {
        let selectorNode = new Selector(name)
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek()!.addChild(selectorNode)
        }
        this.parentNodeStack.push(selectorNode)
        return this
    }

    // parallel() {
    //     let parallel = new Parallel();
    //     this.currentNode.children.push(parallel);
    //     this.currentNode = parallel;
    //     return this;
    // }

    end() {
        this.curNode = this.parentNodeStack.pop()
        return this;
    }

    build() {
        if (this.curNode === undefined) {
            throw new Error('No root node');
          }
          return this.curNode
    }
}

export class BehaviourTreeReturnValues {
    static SUCCESS: number = 1;
    static FAILURE: number = 2;
    static RUNNING: number = 3;
}

// export class BehaviourTree {
//     root: BehaviourTreeNode;
//     currentNode: BehaviourTreeNode;

//     constructor() {
//         this.root = new Sequence('root');
//         this.currentNode = this.root;
//     }

//     tick(actor: Actor) {
//         console.log('tick tree');
//         return this.root.tick(actor);
//     }
// }

export class BehaviourTreeNode {
    params: { 
        func: Function 
        name: string
    } = {
        func: () => {},
        name: ''
    };
    constructor(name: string = '') {
        this.params.name = name;
    }

    tick(actor: Actor) : number{
        console.log('ticker ', this.params.name);
        return BehaviourTreeReturnValues.SUCCESS;
    }
}

class Condition extends BehaviourTreeNode {

}

class Action extends BehaviourTreeNode {
    constructor(name: string, func: Function) {
        super(name);
        this.params.func = func;
    }

    tick(actor: Actor) {
        super.tick(actor);
        return this.params.func(actor);
    }
}

class Sequence extends BehaviourTreeNode {
    private children: LinkedList = new LinkedList();

    tick(actor: Actor) {
        super.tick(actor);
        let result = BehaviourTreeReturnValues.SUCCESS;
        this.children.forEach(child => {
            result = child.tick(actor);
            if (result === BehaviourTreeReturnValues.FAILURE) {
                return result;
            }
        });
        return result;
    }

    addChild(node: BehaviourTreeNode): void {
        this.children.add(node);
    }
}

class Selector extends BehaviourTreeNode {
    private children: LinkedList = new LinkedList();

    tick(actor: Actor) {
        super.tick(actor);
        let result = BehaviourTreeReturnValues.FAILURE;
        this.children.items.every(child => {
            result = child.tick(actor);
            if (result !== BehaviourTreeReturnValues.FAILURE) {
                // console.log('breaking out of loop');
                return false
            }
            return true;
        });
        return result;
    }

    addChild(node: BehaviourTreeNode): void {
        this.children.add(node);
    }
}

class Parallel extends BehaviourTreeNode {
    private children: LinkedList = new LinkedList();
    // numRequiredToFail: number;
    tick(actor: Actor): number {
        super.tick(actor);
        let result = BehaviourTreeReturnValues.SUCCESS;
        this.children.items.every(child => {
            result = child.tick(actor);
            if (result === BehaviourTreeReturnValues.FAILURE) {
                
                return result;
            }
        });
        return result;
    
    }

    addChild(node: BehaviourTreeNode): void {
        this.children.add(node);
    }
}