3 sum其实就是外部加一层循环，且需要去重

//3 sum
//对原数组非递减（递增）排序
        InsertSort(num,num.size());

        for (int i = 0; i < num.size(); ++i)
        {
            //去重
            if (i != 0 && num[i] == num[i-1])
                continue;

            int p = i + 1, q = num.size() - 1;
            int sum = 0;

            //收缩法寻找第2，第3个数
            while (p < q)
            {
                sum = num[i] + num[p] + num[q];

                if (sum == 0)
                {
                    vector<int> newRes;
                    newRes.push_back(num[i]);
                    newRes.push_back(num[p]);
                    newRes.push_back(num[q]);
                    InsertSort(newRes,newRes.size());
                    res.push_back(newRes);


                    //寻找其他可能的2个数，顺带去重
                    while (++p < q  && num[p-1] == num[p])
                    {
                        //do nothing
                    }
                    while (--q > p && num[q+1] == num[q])
                    {
                        //do noghing
                    }
                }
                else if (sum < 0)  //和太小，p向后移动
                {
                    ++p;
                }
                else            //和过大，q向前移动
                {
                    --q;
                }
            }
        }</int>
