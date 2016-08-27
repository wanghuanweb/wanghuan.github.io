public class Solution {
    public List<List<Integer>> generate(int numRows) {

        List<List<Integer>> list = new ArrayList<List<Integer>>();
        List<Integer> listF = new ArrayList<Integer>();

        int i = 2;

        if(numRows == 0) {
            return list;
        }

        listF.add(1);
        list.add(listF);

        for(;i <= numRows;i++) {
        	List<Integer> list1 = new ArrayList<Integer>();
        	List<Integer> list2 = new ArrayList<Integer>();
        	list2 = list.get(i-1-1);
        	System.out.println(list2);

            for(int j = 0;j < i;j++) {
                if(j == 0 || j == i - 1) {
                    list1.add(1);
                } else {
                    list1.add(list2.get(j-1)+list2.get(j));
                }
            }

            list.add(list1);
        }

        return list;
    }
}
