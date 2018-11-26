<template>
  <div class="sell">
    <app-header/>
    <div class="poster">
      <span class="label" :class="{error: titleInput.length >= 1 && !titleSet}">
        Choose a title for your ad. Be brief and precise. {{titleInput.length}} / 70
      </span>
      <p class="title" v-if="titleCommited">{{advert.title}}</p>
      <textarea v-else class="title-input" v-model="titleInput"></textarea>
      <div class="buttons" v-if="!titleCommited">
        <button class="borderless" @click="onCancel">
          <span>cancel</span>
        </button>
        <div class="spacer"></div>
        <button :disabled="!titleSet && advert.title === null" @click="saveTitle">
          <span>next</span>
        </button>
      </div>
      <div v-else>
        <image-uploader :editing="titleCommited && !choosingPrice"/>
        <div class="buttons" v-if="!choosingPrice">
          <button class="borderless" @click="onCancel">
            <span>cancel</span>
          </button>
          <div class="spacer"></div>
          <button class="borderless" @click="toTitle">
            <span>back</span>
          </button>
          <button :disabled="!imagesAdded" @click="toPrice">
            <span>next</span>
          </button>
        </div>
      </div>
      <div v-if="choosingPrice">
        <span class="label" :class="{error: !priceSet}">
          Set the price for what is in this ad.
        </span>
        <p class="price-label" v-if="priceCommitted">R {{advert.price}}</p>
        <div class="price" v-else>
          <span>R</span>
          <input type="text" placeholder="99 9999.99" v-model="priceInput">
        </div>
        <div class="buttons" v-if="!priceCommitted">
          <button class="borderless" @click="onCancel">
            <span>cancel</span>
          </button>
          <div class="spacer"></div>
          <button class="borderless" @click="toImages">
            <span>back</span>
          </button>
          <button :disabled="!imagesAdded && !priceSet" @click="setPrice">
            <span>next</span>
          </button>
        </div>
      </div>
      <div v-if="priceCommitted">
        <span class="label">
          How would you categorize your ad? Choose from categories below.
        </span>
        <div class="categories">
          <div class="choice" v-if="categorySet">
            <span class="name">{{advert.category.name}}</span>
            <button class="borderless" @click="changeCategory">
              <span>change</span>
            </button>
          </div>
          <div class="choices" v-else>
            <span
              class="category" 
              v-for="c in categories" 
              @click="chooseCategory(categories.indexOf(c))"
              :key="c.id">{{c.name}}</span>
          </div>
        </div>
        <span v-if="categorySet" class="label">
          Finally! Describe in detail what you're posting.
        </span>
        <textarea v-if="categorySet" class="description" v-model="descriptionInput"></textarea>
        <div class="buttons" v-if="categorySet">
          <button class="borderless" @click="onCancel">
            <span>cancel</span>
          </button>
          <div class="spacer"></div>
          <button class="borderless" @click="toPrice">
            <span>back</span>
          </button>
          <button :disabled="!categorySet" @click="publish">
            <span>publish</span>
          </button>
        </div>
      </div>
    </div>
    <campus-chooser :on-done="onCancel"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import ImageUploader from '@/market/components/ImageUploader.vue';
import CampusChooser from '@/components/dialogs/CampusChooser.vue';
import store from '@/store';
import { Post, PostCategory } from '@/store/posts';

@Component({
  components: {
    AppHeader,
    ImageUploader,
    CampusChooser,
  },
})
export default class Sell extends Vue {

  private titleInput = '';
  private priceInput = '0';
  private descriptionInput = '';
  private priceCommitted = false;
  private choosingPrice = false;
  private choosingCategory = false;

  private created() {
    store.dispatch('posts/listCategories');
    this.descriptionInput =
      (this.advert.description.length !== 0) ? this.advert.description : '';
    this.choosingPrice = (this.imagesAdded) ? true : false;
    this.titleInput = (this.advert.title != null) ? this.advert.title : '';
    if (this.advert.price !== null) {
      this.priceInput = this.advert.price;
      this.priceCommitted = true;
    }
    this.choosingCategory = (this.categorySet) ? true : false;
  }
  private get categories() {
    const list = store.getters['posts/listCategories'] as PostCategory[];
    const result: PostCategory[] = [];
    list.forEach((element) => {
      const name = element.name.toLowerCase();
      if (name === 'events' || name === 'accommodation') {
        // Do nothing
      } else {
        result.push(element);
      }
    });
    return result;
  }

  private get advert(): Post {
    return store.getters['posts/post'];
  }

  private get titleSet() {
    return /^(.)[^\~%&`]{1,69}$/.test(this.titleInput);
  }

  private get titleCommited() {
    return this.advert.title !== null;
  }

  private get priceSet() {
    return /^(0|[1-9]\d{0,5})(\.\d\d$)*$/.test(this.priceInput);
  }

  private saveTitle() {
    if (this.titleSet) {
      store.commit('posts/postTitle', this.titleInput);
    }
  }

  private toTitle() {
    store.commit('posts/postTitle', null);
  }

  private get imagesAdded() {
    return this.advert.images.length !== 0;
  }

  private toPrice() {
    this.choosingPrice = true;
    this.priceCommitted = false;
  }

  private setPrice() {
    if (this.priceSet) {
      store.commit('posts/postPrice', this.priceInput);
      this.priceCommitted = true;
    }
  }

  private toCategories() {
    this.choosingCategory = true;
  }

  private chooseCategory(index: number) {
    store.commit('posts/chooseCategory', {
      id: this.categories[index].id,
      name: this.categories[index].name,
    });
  }

  private get categorySet() {
    return this.advert.category.id !== 0;
  }

  private changeCategory() {
    store.commit('posts/changeCategory');
  }

  private toImages() {
    this.choosingPrice = false;
  }

  private onCancel() {
    store.commit('posts/clearPost');
    this.titleInput = '';
    this.priceInput = '0';
    this.descriptionInput = '';
    this.priceCommitted = false;
    this.choosingPrice = false;
    this.choosingCategory = false;
  }

  private async publish() {
    store.commit('posts/postDescription', this.descriptionInput);
    try {
      await store.dispatch('insties/fetchInstitutions');
      store.commit('posts/chooseCampus');
    } catch (error) {
      // Send notification here
    }
  }

}
</script>

<style lang="scss" scoped>
div.sell {
  .poster {
    background-color: white;
    padding: 20px 50px;
    margin: auto;
    margin-top: 30px;
    max-width: 700px;
    border-radius: 5px;
    box-shadow: 0 1px 1px 1px #ccc;
    --title-fosi: 1.2em;

    .label {
      display: block;
      padding: 10px 0;
      font-size: 0.9em;
      color: rgb(104, 104, 104);
      border-bottom: 1px solid rgba(224, 224, 224, 0.534);

      &.error {
        color: red;
      }
    }
    .title {
      margin: 5px 0;
      padding: 0;
      font-size: var(--title-fosi);
      overflow: hidden;
    }
    .title-input {
      border: none;
      outline: none;
      width: 100%;
      margin: 5px 0;
      padding: 0;
      font-size: var(--title-fosi);
      border-bottom: 2px solid #ccc;
      resize: none;
      font-family: Arial, Helvetica, sans-serif;
      &:focus {
        border-bottom-color: var(--primary-color);
      }
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
      .spacer {
        flex-grow: 1;
      }
    }
    .price-label {
      padding: 5px 3px;
      font-size: 1.5em;
      border: none;
      outline: none;
      margin: auto;
    }
    .price {
      display: flex;
      input {
        flex-grow: 1;
      }
      input,
      span {
        padding: 5px 3px;
        font-size: 1.5em;
        border: none;
        outline: none;
        border-bottom: 2px solid #ccc;
      }
    }
    .categories {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;

      .choice {
        display: flex;
        margin: 10px;

        > span {
          display: inline-block;
          padding: 15px;
          background-color: white;
          border-radius: 40px;
          font-size: 1.2em;
          box-shadow: 0 1px 2px 1px #ccc;
          text-transform: capitalize;
        }
      }
      .choices {
        flex-basis: 100%;
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        .category {
          padding: 15px;
          margin: 5px;
          text-transform: capitalize;
          border-radius: 25px;
          box-shadow: 0 1px 2px 1px #ccc;
          font-size: 0.65em;
          cursor: pointer;
          &:hover {
            background-color: var(--primary-color-hover);
            color: white;
          }
        }
      }
    }
    .description {
      min-height: 180px;
      border: 1px solid #ccc;
      outline: none;
      padding: 5px;
      width: 100%;
      resize: none;
      overflow: auto;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1em;
      &:focus {
        border-color: var(--primary-color);
      }
    }
  }
  @media screen and (max-width: 768px) {
    .poster {
      .images {
        .image {
          width: 120px;
          height: 120px;
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    .poster {
      padding: 10px 5px;
      margin: 5px 0;
      border-radius: 0;

      .images {
        .image {
          width: 75px;
          height: 70px;
        }
      }
      .categories {
        .choice {
          > span {
            display: inline-block;
            padding: 15px;
            background-color: white;
            border-radius: 40px;
            font-size: 1em;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
