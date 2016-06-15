class MyStack {
    // Push element x onto stack.
    List<Integer> queue1 = new LinkedList<Integer>();
    List<Integer> queue2 = new LinkedList<Integer>();

    public void push(int x) {
        if(!queue1.isEmpty()) {
            queue1.add(x);
        } else {
            queue2.add(x);
        }
    }

    // Removes the element on top of the stack.
    public void pop() {
        // 两个队列中至少有一个为空，将queue1设置非空
        if(queue1.isEmpty()) {
            List<Integer> tmp = queue2;
            queue2 = queue1;
            queue1 = tmp;
        }

        while(queue1.size() > 1) {
            queue2.add(queue1.remove(0));
        }

        queue1.clear();
    }

    // Get the top element.
    public int top() {
        // 两个队列中至少有一个为空，将queue1设置非空
        if(queue1.isEmpty()) {
            List<Integer> tmp = queue2;
            queue2 = queue1;
            queue1 = tmp;
        }

        while(queue1.size() > 1) {
            queue2.add(queue1.remove(0));
        }
        queue2.add(queue1.get(0));

        return queue1.remove(0);
    }

    // Return whether the stack is empty.
    public boolean empty() {
        return queue1.isEmpty() && queue2.isEmpty();
    }
}
