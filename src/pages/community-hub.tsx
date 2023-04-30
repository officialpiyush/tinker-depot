import Chip from "~/components/Chip";

export default function CommunityHub() {
  return (
    <div className="flex h-full items-center gap-8 py-4">
      {[
        {
          image: "/cmt/genshin.png",
          title: "Sowing a chibi Yae Miko Genshin plushie [ for beginners ]",
          tags: "#sewing and tailoring",
          description: `
          In this blog post, you will learn how to sow a chibi Yae Miko
          Genshin plushie. This tutorial is designed for beginners and will
          take you through the step-by-step process of creating your own
          adorable Yae Miko plushie. You will need some basic materials such
          as fabric, stuffing, needle, thread, and scissors. The tutorial will
          provide you with a list of materials needed, as well as some tips on
          where to find them. The tutorial will then guide you through the
          process of creating a pattern for your plushie, cutting out the
          fabric pieces, stitching them together, and stuffing the plushie to
          give it its adorable shape. It will also cover the importance of
          neat stitching and finishing touches that will make your plushie
          look professional.`,
        },
        {
          image: "/cmt/mochi.png",
          title: "3 ingredient strawberry mochi recipe [ for beginners <3 ] ",
          tags: "#cooking",
          description: `If you're looking for a simple and delicious treat to make at home, this 3-ingredient strawberry mochi recipe is perfect for you! This recipe is designed for beginners and requires only a few basic ingredients that are easy to find at your local grocery store.

          To make this strawberry mochi, you will need three main ingredients: sweet rice flour, sugar, and fresh strawberries. The recipe will provide you with a list of quantities needed for each ingredient, as well as some tips on where to find them.
          
          The tutorial will then guide you through the process of preparing the sweet rice flour dough, making the strawberry filling, and assembling the mochi balls. You'll learn how to mold the dough into small balls and flatten them into circles before adding the sweet strawberry filling.`,
        },
        {
          image: "/cmt/blender.png",
          title: "Blender 3D modelling a living room [ Intermediate ]",
          tags: "#3D modelling",
          description: `If you're looking to take your Blender 3D modeling skills to the next level, creating a 3D model of a living room is a great project to tackle. This tutorial is designed for intermediate-level Blender users and will take you through the step-by-step process of creating a detailed living room model.

          First, you'll start by gathering some inspiration for your living room design. You can look online for reference images or create a mood board to help guide your design decisions.
                    
          Throughout the tutorial, there will be helpful images and video demonstrations to help you visualize each step. You'll learn how to create realistic textures and materials, set up lighting and camera angles to create a compelling scene, and even add finishing touches like curtains and plants.`.split("\n\n").join("")
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex h-full flex-col gap-6 rounded-xl bg-[#a7cd4f] px-4 py-8"
        >
          <div
            className="relative mx-auto h-48 w-96 rounded-xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute left-0 top-0 px-4 py-4">
              <Chip className="mb-2 w-fit bg-opacity-50" title="Trending" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-center gap-3 rounded-b-xl bg-[#4D6B70] bg-opacity-70 py-3 text-xs text-white">
              <div className="text[#D9D9D9]">{item.title}</div>
            </div>
          </div>

          <div className="px-4 tracking-tight">{item.description}</div>
        </div>
      ))}
    </div>
  );
}
